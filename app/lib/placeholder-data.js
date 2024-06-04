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
    price: 80000,
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
    id: '985e51f3-720a-4dc0-bcaf-408b84a245fe',
    customer_id: customers[0].id,
    amount: 50000,
    invoice_date: '2023-01-01',
    due_date: '2023-02-01',
    status: 'paid',
  },
  {
    id: '10b17ee2-a6a7-4529-84b2-e9e561e37481',
    customer_id: customers[1].id,
    amount: 50000,
    invoice_date: '2023-02-01',
    due_date: '2023-03-01',
    status: 'paid',
  },
  {
    id: '29bb5262-f24a-4060-ae47-3764676a0c30',
    customer_id: customers[2].id,
    amount: 50000,
    invoice_date: '2023-03-01',
    due_date: '2023-04-01',
    status: 'paid',
  },
  {
    id: '0a03b326-a9ad-4596-93d9-5028d2d3fcfd',
    customer_id: customers[3].id,
    amount: 50000,
    invoice_date: '2023-04-01',
    due_date: '2023-05-01',
    status: 'paid',
  },
  {
    id: 'd1a5d2e7-a94f-4cf4-b8e9-989bd6b4c553',
    customer_id: customers[4].id,
    amount: 50000,
    invoice_date: '2023-05-01',
    due_date: '2023-06-01',
    status: 'paid',
  },
  {
    id: '7e60098d-c255-4d37-946e-d81f0dcdb9ca',
    customer_id: customers[5].id,
    amount: 60000,
    invoice_date: '2024-04-01',
    due_date: '2024-05-01',
    status: 'paid',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174100',
    customer_id: customers[1].id,
    amount: 60000,
    invoice_date: '2024-05-01',
    due_date: '2024-06-01',
    status: 'pending',
  },
  {
    id: '3538a751-8784-4603-b445-33f802db7bdf',
    customer_id: customers[2].id,
    amount: 120000,
    invoice_date: '2024-05-05',
    due_date: '2024-06-05',
    status: 'pending',
  },
  {
    id: 'a710cd7b-9e99-4bc0-84a3-af84bcf96ded',
    customer_id: customers[6].id,
    amount: 90000,
    invoice_date: '2024-05-10',
    due_date: '2024-06-10',
    status: 'paid',
  },
  {
    id: '929c9079-de7a-428b-97ff-581684deab07',
    customer_id: customers[4].id,
    amount: 80000,
    invoice_date: '2024-05-15',
    due_date: '2024-06-15',
    status: 'pending',
  }
];

const orders = [
  {
    id: 'a79960bf-7f62-4f6e-94d9-834352d623e7',
    invoice_id: invoices[5].id,
    menu_id: menus[2].id,
    order_date: '2024-05-01',
    order_time: '13:00',
    total_items: 10,
    notes: '-'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174201',
    invoice_id: invoices[6].id,
    menu_id: menus[0].id,
    order_date: '2024-05-01',
    order_time: '13:00',
    total_items: 2,
    notes: '-'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174202',
    invoice_id: invoices[7].id,
    menu_id: menus[0].id,
    order_date: '2024-05-05',
    order_time: '13:45',
    total_items: 4,
    notes: '-'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174200',
    invoice_id: invoices[8].id,
    menu_id: menus[0].id,
    order_date: '2024-05-10',
    order_time: '12:30',
    total_items: 3,
    notes: '-'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174203',
    invoice_id: invoices[9].id,
    menu_id: menus[1].id,
    order_date: '2024-05-15',
    order_time: '14:15',
    total_items: 1,
    notes: '-'
  }
];

const revenue = [
  { year: '2024', month: 'Jan', revenue: 2000 },
  { year: '2024', month: 'Feb', revenue: 1800 },
  { year: '2024', month: 'Mar', revenue: 2200 },
  { year: '2024', month: 'Apr', revenue: 2500 },
  { year: '2024', month: 'May', revenue: 2300 },
  { year: '2024', month: 'Jun', revenue: 3200 },
  { year: '2024', month: 'Jul', revenue: 3500 },
  { year: '2024', month: 'Aug', revenue: 3700 },
  { year: '2024', month: 'Sep', revenue: 2500 },
  { year: '2024', month: 'Oct', revenue: 2800 },
  { year: '2024', month: 'Nov', revenue: 3000 },
  { year: '2024', month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  customers,
  menus,
  invoices,
  orders,
  revenue,
};