'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchemaCustomer = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  alamat: z.string(),
  image_url: z.string()
})

const FormSchemaMenu = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  category: z.string(),
  available: z.boolean()
})

const CreateCustomers = FormSchemaCustomer.omit({ id: true });
const UpdateCustomers = FormSchemaCustomer.omit({ id: true, });

const CreateMenus = FormSchemaMenu.omit({ id: true });
const UpdateMenus = FormSchemaMenu.omit({ id: true, });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Username and password do not match.';
        default:
          return 'Username and password do not match.';
      }
    }
    throw error;
  }
}

export async function createCustomers(formData: FormData) {
   
  const img = formData.get('image');
  console.log(img);
  
  let filename = '';
  if (img instanceof File) {
    filename = '/customers/' + img.name;
    console.log(filename);
  }
  
  const { name, email, image_url, alamat } = CreateCustomers.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    alamat: formData.get('alamat'),
    image_url: filename,
  });
  
  try {
    await sql`
      INSERT INTO customers (name, email, image_url, address)
      VALUES (${name}, ${email}, ${image_url}, ${alamat})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create customers.',
    };
  }
  
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}
  
export async function deleteCustomers(id: string) {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
    revalidatePath('/dashboard/customers');
    return { message: 'Deleted customers' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete customers' };
  }
}

export async function updateCustomers(id: string, formData: FormData) {
  const img = formData.get('image')
  console.log(img);
  let filename = '';
  if(img instanceof File) {
    filename = '/customers/' + img.name;
    console.log(filename);
  }
  const { name, email, alamat, image_url } = UpdateCustomers.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    alamat: formData.get('address'),
    image_url: filename,
  });

  try {
    await sql`
        UPDATE customers
        SET name = ${name}, email = ${email}, image_url = ${image_url}, address = ${alamat}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update customers.' };
  }
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}


export async function createMenus(formData: FormData) {
  
  const name = formData.get('name');
  const price = parseInt(formData.get('price') as string);
  const category = formData.get('category');
  const available = formData.get('available');

  const parsedData = CreateMenus.parse({
    name,
    price,
    category,
    available: available ? true : false, 
  });
console.log(parsedData);
  
  try {
    await sql`
      INSERT INTO menus (name, price, category, available, item_image)
      VALUES (${parsedData.name}, ${parsedData.price}, ${parsedData.category}, ${parsedData.available}, '/menus/-')
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create menus.',
    };
  }
  
console.log(parsedData);
  revalidatePath('/dashboard/menus');
  redirect('/dashboard/menus');
}
 
export async function deleteMenus(id: string) {
  try {
    await sql`DELETE FROM menus WHERE id = ${id}`;
    revalidatePath('/dashboard/menus');
    return { message: 'Deleted Menus' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Menus' };
  }
}

export async function updateMenus(id: string, formData: FormData) {
  const { name, price, category, available } = UpdateMenus.parse({
    name: formData.get('name'),
    price: parseInt(formData.get('price') as string),
    category: formData.get('category'),
    available: formData.get('available') ? true : false,
  });

  try {
    await sql`
        UPDATE menus
        SET name = ${name}, price = ${price}, category = ${category}, available = ${available}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update menus.' };
  }
  revalidatePath('/dashboard/menus');
  redirect('/dashboard/menus');
}

export async function deleteOrders(id: string) {
  try {
    await sql`DELETE FROM orders WHERE id = ${id}`;
    revalidatePath('/dashboard/orders');
    return { message: 'Deleted Orders' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Orders' };
  }
}