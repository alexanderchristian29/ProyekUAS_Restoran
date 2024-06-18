import Form from '@/app/ui/orders/edit-form';
import Breadcrumbs from '@/app/ui/orders/breadcrumbs';
import { fetchOrdersById, fetchOrders, fetchDropdownCustomers, fetchDropdownMenus } from '@/app/lib/data';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  
  const customers = await fetchDropdownCustomers();
  const menus = await fetchDropdownMenus();

  const [orders] = await Promise.all([
    fetchOrdersById(id),
    fetchOrders(),
  ]);
  if(!orders){
    notFound();
  }
  return (
    <main>
      <Suspense>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Orders', href: '/dashboard/orders' },
          {
            label: 'Edit Orders',
            href: `/dashboard/orders/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form orders={orders} customers={customers} menus={menus} />
      </Suspense>
    </main>
  );
}