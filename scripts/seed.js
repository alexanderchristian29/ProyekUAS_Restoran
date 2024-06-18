const { db } = require('@vercel/postgres');
const {
  users,
  customers,
  menus,
  invoices,
  orders,
  revenue,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, address, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.address}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedMenus(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "menus" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS menus (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        category VARCHAR(255) NOT NULL,
        available BOOLEAN NOT NULL,
        item_image VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "menus" table`);

    // Insert data into the "menus" table
    const insertedMenus = await Promise.all(
      menus.map(
        (menu) => client.sql`
        INSERT INTO menus (id, name, price, category, available, item_image)
        VALUES (${menu.id}, ${menu.name}, ${menu.price}, ${menu.category}, ${menu.available}, ${menu.item_image})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedMenus.length} menus`);

    return {
      createTable,
      menus: insertedMenus,
    };
  } catch (error) {
    console.error('Error seeding menus:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        invoice_date DATE NOT NULL,
        due_date DATE NOT NULL,
        status VARCHAR(255) NOT NULL,
        CONSTRAINT fk_customer
          FOREIGN KEY(customer_id) 
            REFERENCES customers(id)
            ON DELETE CASCADE
      );
    `;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (id, customer_id, amount, invoice_date, due_date, status)
        VALUES (${invoice.id}, ${invoice.customer_id}, ${invoice.amount}, ${invoice.invoice_date}, ${invoice.due_date}, ${invoice.status})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedOrders(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "orders" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        invoice_id UUID NOT NULL,
        menu_id UUID NOT NULL,
        order_date DATE NOT NULL,
        order_time TIME NOT NULL,
        total_items INT NOT NULL,
        notes TEXT,
        CONSTRAINT fk_invoice
          FOREIGN KEY(invoice_id) 
            REFERENCES invoices(id)
            ON DELETE CASCADE,
        CONSTRAINT fk_menu
          FOREIGN KEY(menu_id) 
            REFERENCES menus(id)
            ON DELETE CASCADE
      );
    `;

    console.log(`Created "orders" table`);

    // Insert data into the "orders" table
    const insertedOrders = await Promise.all(
      orders.map(
        (order) => client.sql`
        INSERT INTO orders (id, invoice_id, menu_id, order_date, order_time, total_items, notes)
        VALUES (${order.id}, ${order.invoice_id}, ${order.menu_id}, ${order.order_date}, ${order.order_time}, ${order.total_items}, ${order.notes})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedOrders.length} orders`);

    return {
      createTable,
      orders: insertedOrders,
    };
  } catch (error) {
    console.error('Error seeding orders:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        id BIGSERIAL PRIMARY KEY,
        year VARCHAR(10) NOT NULL,
        month VARCHAR(10) NOT NULL,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (year, month, revenue)
        VALUES (${rev.year},${rev.month}, ${rev.revenue})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // drop table 
  await client.sql`DROP TABLE IF EXISTS orders CASCADE`;
  await client.sql`DROP TABLE IF EXISTS invoices CASCADE`;
  await client.sql`DROP TABLE IF EXISTS customers CASCADE`;
  await client.sql`DROP TABLE IF EXISTS menus CASCADE`;
  await client.sql`DROP TABLE IF EXISTS revenue CASCADE`;
  await client.sql`DROP TABLE IF EXISTS users CASCADE`;

  await seedUsers(client);
  await seedCustomers(client);
  await seedMenus(client);
  await seedInvoices(client);
  await seedOrders(client);
  await seedRevenue(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
