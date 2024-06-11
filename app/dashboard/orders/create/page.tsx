import Form from '@/app/ui/orders/create-form';
import Breadcrumbs from '@/app/ui//orders/breadcrumbs';
import { Suspense } from 'react';
import { fetchOrders } from '@/app/lib/data';
 
 
export default async function Page() {
  const orders = await fetchOrders();
console.log(orders);
  return (
    <main>
      <Suspense>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Orders', href: '/dashboard/menus' },
          {
            label: 'Create Orders',
            href: '/dashboard/menus/create',
            active: true,
          },
        ]}
      />
      <Form orders={[]} />
      </Suspense>
    </main>
  );
}