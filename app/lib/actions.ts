'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { fetchMenuById } from './data';
import { File } from 'buffer';

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

const FormSchemaOrders = z.object({
  id: z.string(),
  menu: z.string(),
  item: z.number(),
  customer: z.string()
})

const FormSchemaOrders2 = z.object({
  id: z.string(),
  menu: z.string(),
  item: z.number(),
  invoices: z.string(),
  status: z.string()
})

const CreateCustomers = FormSchemaCustomer.omit({ id: true });
const UpdateCustomers = FormSchemaCustomer.omit({ id: true, });

const CreateMenus = FormSchemaMenu.omit({ id: true });
const UpdateMenus = FormSchemaMenu.omit({ id: true, });


const CreateOrders = FormSchemaOrders.omit({ id: true });
const UpdateOrders = FormSchemaOrders2.omit({ id: true });

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

export async function createOrders(formData: FormData) {
  const menu = formData.get('menu');
  const customer = formData.get('customer');
  const item = parseInt(formData.get('item') as string);
  const note = formData.get('note') as string;

  // Parse data dari formData
  const parsedData = CreateOrders.parse({
    menu,
    customer,
    item
  });

  // Ambil detail menu berdasarkan ID menu dari parsedData
  const menus = await fetchMenuById(parsedData.menu);
  
  // Menghitung tanggal invoice hari ini
  const invoiceDate = new Date().toISOString().slice(0, 10);

  // Menghitung tanggal jatuh tempo 7 hari ke depan
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);
  const dueDateFormatted = dueDate.toISOString().slice(0, 10);

  try {
    // Menyimpan data invoice baru ke dalam tabel invoices
    const { rows: [newInvoice] } = await sql`
      INSERT INTO invoices (customer_id, amount, invoice_date, due_date, status)
      VALUES (${parsedData.customer}, ${parsedData.item * parseInt(menus.price)}, ${invoiceDate}, ${dueDateFormatted}, 'pending')
      RETURNING id;
    `;

    console.log('New invoice ID:', newInvoice.id);

    // Memasukkan data order baru ke dalam tabel orders
    await sql`
      INSERT INTO orders (invoice_id, menu_id, order_date, order_time, total_items, notes)
      VALUES (${newInvoice.id}, ${parsedData.menu}, ${invoiceDate}, CURRENT_TIME, ${parsedData.item}, ${note});
    `;

    console.log('New order created successfully.');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create menus.',
    };
  }
  
  console.log(parsedData);
  revalidatePath('/dashboard/orders');
  redirect('/dashboard/orders');
}


export async function updateOrders(id: string, formData: FormData) {
  const menu = formData.get('menu_id');
  const item = parseInt(formData.get('total_items') as string);
  const note = formData.get('notes') as string;
  const invoices = formData.get('invoices') as string;
  const status = formData.get('status') as string;

  // Parse data dari formData
  const parsedData = UpdateOrders.parse({
    menu,
    item,
    invoices,
    status
  });

  // Ambil detail menu berdasarkan ID menu dari parsedData
  const menus = await fetchMenuById(parsedData.menu);

  console.log(parsedData);
  try {
    // Menyimpan data invoice baru ke dalam tabel invoices
    await sql`
       UPDATE invoices
        SET 
          amount = ${parsedData.item * parseInt(menus.price)}, status = ${status}
        WHERE id = ${invoices}
    `;

    // Memasukkan data order baru ke dalam tabel orders
    await sql`
       UPDATE orders
        SET 
          menu_id = ${parsedData.menu}, total_items = ${parsedData.item}, notes = ${note}
        WHERE id = ${id}    
    `;

    console.log('Order updated successfully.');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create menus.',
    };
  }
  
  revalidatePath('/dashboard/orders');
  redirect('/dashboard/orders');
}