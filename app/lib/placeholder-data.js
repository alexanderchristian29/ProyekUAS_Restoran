// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User 1',
    email: 'user1@nextmail.com',
    password: '123456',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User 2',
    email: 'user2@nextmail.com',
    password: '123456',
  },
  {
    id: '5383a92d-526f-4b6c-8ab5-5fc8fed568ea',
    name: 'User 3',
    email: 'user3@nextmail.com',
    password: '123456',
  },
  {
    id: '32f234b1-978c-4af3-95f6-b1cd0581faa2',
    name: 'User 4',
    email: 'user4@nextmail.com',
    password: '123456',
  }
];

const customers = [
  {
    id: '38a20397-17e7-4af6-aa25-ea9186076e0e',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    address: 'Avenida Paulista, 2000',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: 'bad5ff09-e853-4bfe-8d64-9ad96f8acfa8',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    address: '1234 Main Street',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: 'f0f897c9-f61e-44f8-b965-36472d987bdb',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    address: '42 Galaxy Way',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    address: '1234 Elm Street',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    address: '1234 Pine Street',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    address: '1234 Oak Street',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    address: '1234 Cedar Street',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    address: '1234 Maple Street',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    address: '1234 Mulberry Street',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    address: '1234 Walnut Street',
    image_url: '/customers/balazs-orban.png',
  },
];

const menus = [
  {
    id: '123e4567-e89b-12d3-a456-426614174300',
    name: 'Burger',
    price: 30000,
    category: 'Main Course',
    available: true,
    item_image: '/menus/burger.jpg'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174301',
    name: 'Caesar Salad',
    price: 8000,
    category: 'Starter',
    available: true,
    item_image: '/menus/caesar_salad.jpg'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174302',
    name: 'Chocolate Cake',
    price: 6000,
    category: 'Dessert',
    available: true,
    item_image: '/menus/chocolate_cake.jpg'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174303',
    name: 'Lemonade',
    price: 4000,
    category: 'Beverage',
    available: true,
    item_image: '/menus/lemonade.jpg'
  }
];

const invoices = [
  {
    id: '123e4567-e89b-12d3-a456-426614174100',
    customer_id: customers[0].id,
    total_amount: 50000,
    invoice_date: '2024-05-01',
    due_date: '2024-06-01',
    status: 'pending',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174101',
    customer_id: customers[1].id,
    total_amount: 75000,
    invoice_date: '2024-05-05',
    due_date: '2024-06-05',
    status: 'pending',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174102',
    customer_id: customers[2].id,
    total_amount: 100000,
    invoice_date: '2024-05-10',
    due_date: '2024-06-10',
    status: 'paid',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174103',
    customer_id: customers[3].id,
    total_amount: 125000,
    invoice_date: '2024-05-15',
    due_date: '2024-06-15',
    status: 'paid',
  }
];

const orders = [
  {
    id: '123e4567-e89b-12d3-a456-426614174200',
    invoice_id: invoices[0].id,
    order_date: '2024-05-01',
    order_time: '12:30',
    total_items: 3,
    notes: 'Extra napkins'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174201',
    invoice_id: invoices[1].id,
    order_date: '2024-05-05',
    order_time: '13:00',
    total_items: 2,
    notes: 'No onions'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174202',
    invoice_id: invoices[2].id,
    order_date: '2024-05-10',
    order_time: '13:45',
    total_items: 4,
    notes: 'Spicy level 2'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174203',
    invoice_id: invoices[3].id,
    order_date: '2024-05-15',
    order_time: '14:15',
    total_items: 1,
    notes: 'Extra sauce'
  }
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  customers,
  menus,
  invoices,
  orders,
  revenue,
};
