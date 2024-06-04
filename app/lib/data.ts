'use server';

import { sql } from '@vercel/postgres';
import { formatCurrency } from './utils';
import { LatestInvoiceRaw, LatestOrders, OrdersTableType, Revenue } from './definitions';
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
      ORDER BY invoices.invoice_date DESC, invoices.id ASC`;

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