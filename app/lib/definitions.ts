// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  address: string | null;
  image_url: string;
};

export type Menu = {
  id: string;
  name: string;
  price: number;
  category: string;
  available: boolean;
  item_image: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  total: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Order = {
  id: string;
  invoice_id: string;
  order_date: string;
  order_time: string;
  total_items: number;
  notes: string | null;
};

export type Revenue = {
  id: number;
  year: string;
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
  status: 'pending' | 'paid';
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type LatestOrders = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  order_date: string;
};

export type OrdersTableType = {
  id: string;
  name: string;
  image_url: string;
  order_date: string;
  nama_menu: string;
  total_item: number;
  harga_menu: number;
  total_harga?: number;
}

// export type LatestOrdersRaw = Omit<LatestOrders, 'amount'> & {
//   amount: number;
// };

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  address: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type CustomerField = {
  id: string;
  name: string;
  email: string;
  address: string;
  image_url: string;
};

export type CustomerForm = {
  id: string;
  name: string;
  email: string;
  address: string;
  image_url: string;
};

export type MenuForm = {
  id: string;
  name: string;
  price: string;
  category: string;
  available: boolean;
};

export type OrderForm = {
  id: string;
  invoice_id: string;
  menu_id: string;
  order_date: string;
  order_time: string;
  total_items: number;
  notes: string | null;
};

export type OrdersField = {
  id: string;
  name: string;
  email: string;
  address: string;
  image_url: string;
};

export type MenusTableType ={
  id: string;
  name: string;
  price: string;
  category: string;
  available: boolean;
}

export type MenuField = {
  id: string;
  name: string;
  price: string;
  category: string;
  available: boolean;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
