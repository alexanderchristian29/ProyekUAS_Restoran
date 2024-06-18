'use server';

import { sql } from '@vercel/postgres';
import { formatCurrency } from './utils';
import { CustomerDropwdownField, CustomerField, CustomerForm, CustomersTableType, LatestInvoiceRaw, LatestOrders, MenuDropwdownField, MenuField, MenuForm, MenusTableType, OrderForm, OrdersField, OrdersTableType, Revenue } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 3;

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(invoices.id) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(customers.id) FROM customers`;
    const orderCountPromise = sql`SELECT COUNT(orders.id) FROM orders`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS "pending"
         FROM invoices`;
         
// group by invoices.id
    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      orderCountPromise,
      invoiceStatusPromise,
    ]);
    console.log(data[0].rows[0]);
    console.log(data[1].rows[0]);
    console.log(data[2].rows[0]);
    console.log(data[3].rows[0]);
    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const orderOfCustomers = Number(data[2].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[3].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[3].rows[0].pending ?? '0');
 
    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
      orderOfCustomers,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
 
    const data = await sql<Revenue>`SELECT year, month, revenue FROM revenue`;
    console.log(data.rows);
 
    // console.log('Data fetch completed after 3 seconds.');
 
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    noStore();
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.id, customers.name, customers.image_url, customers.email, invoices.amount, invoices.status
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.invoice_date DESC, invoices.id ASC
      LIMIT 5`;
 
    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    // console.log(latestInvoices);
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchLatestOrders() {
  try {
    noStore();
    const data = await sql<LatestOrders>`
        SELECT orders.id, customers.name, customers.image_url, customers.email, TO_CHAR(orders.order_date, 'DD Mon YYYY') AS order_date
        FROM orders
        JOIN invoices ON orders.invoice_id = invoices.id
        JOIN customers ON invoices.customer_id = customers.id
        JOIN menus ON orders.menu_id = menus.id
        ORDER BY invoices.invoice_date DESC, invoices.id ASC
        LIMIT 5`;
    console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest reservations.');
  }
}

/* orders fungsi */

/* filtered */
export async function fetchOrdersPages(query: string) {
  noStore();
  try {
    const count = await sql`
      SELECT COUNT(orders.id)
      FROM orders
      LEFT JOIN invoices ON orders.invoice_id = invoices.id
      LEFT JOIN customers ON invoices.customer_id = customers.id
      LEFT JOIN menus ON orders.menu_id = menus.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        menus.name ILIKE ${`%${query}%`}
    `;
 
    const totalOrders = Number(count.rows[0].count);
    return totalOrders;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

export async function fetchFilteredOrders(
    query: string,
    currentPage: number,
  ){
  
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    noStore();
    const data = await sql<OrdersTableType>`
      SELECT 
        orders.id,
        notes,
        customers.name, 
        customers.image_url,
        TO_CHAR(orders.order_date, 'DD Mon YYYY') AS order_date,
        menus.name as nama_menu,
        orders.total_items as total_item,
        menus.price as harga_menu
      FROM orders
      LEFT JOIN invoices ON orders.invoice_id = invoices.id
      LEFT JOIN customers ON invoices.customer_id = customers.id
      LEFT JOIN menus ON orders.menu_id = menus.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        menus.name ILIKE ${`%${query}%`}
      ORDER BY invoices.invoice_date DESC, invoices.id ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;

    const orders = data.rows.map((order) => ({
      ...order,
      harga_menu: formatCurrency(order.harga_menu),
      total_harga: formatCurrency(order.total_item * order.harga_menu),
    }));
 
    return orders;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchOrders() {
  noStore();
  try {
    const data = await sql<OrdersField>`
      SELECT
      orders.id,
      orders.invoice_id,
      orders.menu_id,
      orders.order_date,
      orders.order_time,
      orders.total_items,
      orders.notes
      FROM orders
      ORDER BY orders.id ASC
    `;
 
    const orders = data.rows;
    return orders;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all orders.');
  }
}
export async function fetchOrdersById(id: string) {
  noStore();
  try {
    const data = await sql<OrderForm>`
      SELECT
      orders.id,
      orders.invoice_id,
      orders.menu_id,
      orders.order_date,
      orders.order_time,
      orders.total_items,
      orders.notes
      FROM orders
      WHERE orders.id = ${id};
    `;
 
    const orders = data.rows.map((orders) => ({
      ...orders,
    }));
    console.log(orders);
 
    return orders[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch orders.');
  }
}
/* orders fungsi */


/* customers fungsi */

/* filtered */
export async function fetchCustomersPages(query: string) {
  noStore();
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM customers
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
    `;
 
    const totalCustomers = Number(count.rows[0].count);
    return totalCustomers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

export async function fetchFilteredCustomers(
    query: string,
    currentPage: number,
  ){
  
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    noStore();
    const data = await sql<CustomersTableType>`
      SELECT 
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        customers.address,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers 
      LEFT OUTER JOIN invoices ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
      GROUP BY customers.id, customers.name, customers.email, customers.image_url, customers.address
      ORDER BY customers.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
 
    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name,
        email,
        address,
        image_url
      FROM customers
      ORDER BY name ASC
    `;
 
    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchCustomerById(id: string) {
  noStore();
  try {
    const data = await sql<CustomerForm>`
      SELECT
      customers.id,
      customers.name,
      customers.email,
      customers.address,
      customers.image_url
      FROM customers
      WHERE customers.id = ${id};
    `;
 
    const customers = data.rows.map((customers) => ({
      ...customers,
    }));
 
    return customers[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

export async function fetchDropdownCustomers() {
  noStore();
  try {
    const data = await sql<CustomerDropwdownField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;
 
    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
/* customers fungsi */


/* menus fungsi */

/* filtered */
export async function fetchMenusPages(query: string) {
  noStore();
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM menus
      WHERE
        menus.name ILIKE ${`%${query}%`} OR
        menus.category ILIKE ${`%${query}%`}
    `;
 
    const totalMenus = Number(count.rows[0].count);
    return totalMenus;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of menus.');
  }
}

export async function fetchFilteredMenus(
    query: string,
    currentPage: number,
  ){
  
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    noStore();
    const data = await sql<MenusTableType>`
      SELECT 
        menus.id,
        menus.name,
        menus.category,
        menus.price,
        menus.available
      FROM menus
      WHERE
        menus.name ILIKE ${`%${query}%`} OR
        menus.category ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
 
    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch menus table.');
  }
}

export async function fetchMenus() {
  try {
    noStore();
    const data = await sql<MenuField>`
      SELECT
        id,
        name,
        price,
        category,
        available
      FROM menus
      ORDER BY name ASC
    `;
 
    const menus = data.rows;
    return menus;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all menus.');
  }
}

export async function fetchMenuById(id: string) {
  noStore();
  try {
    const data = await sql<MenuForm>`
      SELECT
        menus.id,
        menus.name,
        menus.price,
        menus.category,
        menus.available
      FROM menus
      WHERE menus.id = ${id};
    `;
 
    const menus = data.rows.map((menus) => ({
      ...menus,
    }));
 
    return menus[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch menus.');
  }
}

export async function fetchDropdownMenus() {
  noStore();
  try {
    const data = await sql<MenuDropwdownField>`
      SELECT
        id,
        name,
        price
      FROM menus
      ORDER BY name ASC
    `;
 
    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
/* menus fungsi */