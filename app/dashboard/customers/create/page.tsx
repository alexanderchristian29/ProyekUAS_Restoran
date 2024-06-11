import Form from '@/app/ui/customers/create-form';
import Breadcrumbs from '@/app/ui//customers/breadcrumbs';
import { Suspense } from 'react';
import { fetchCustomers } from '@/app/lib/data';
 
 
export default async function Page() {
  const customers = await fetchCustomers();
console.log(customers);
  return (
    <main>
      <Suspense>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Create Customers',
            href: '/dashboard/customers/create',
            active: true,
          },
        ]}
      />
      <Form customers={[]} />
      </Suspense>
    </main>
  );
}