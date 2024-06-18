import Form from '@/app/ui/orders/create-form';
import Breadcrumbs from '@/app/ui//orders/breadcrumbs';
import { Suspense } from 'react';
import { fetchDropdownCustomers, fetchDropdownMenus } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchDropdownCustomers();
  const menus = await fetchDropdownMenus();

  return (
    <main>
      <Suspense>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Orders', href: '/dashboard/orders' },
          {
            label: 'Create Orders',
            href: '/dashboard/orders/create',
            active: true,
          },
        ]}
      />
      <Form orders={[]} customers={customers} menus={menus} />
      </Suspense>
    </main>
  );
}