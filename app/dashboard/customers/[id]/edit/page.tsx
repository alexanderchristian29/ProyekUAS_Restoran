import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import { fetchCustomerById, fetchCustomers } from '@/app/lib/data';
import { Suspense } from 'react';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
  const [customers] = await Promise.all([
    fetchCustomerById(id),
    fetchCustomers(),
  ]);
  return (
    <main>
      <Suspense>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'customers', href: '/dashboard/customers' },
          {
            label: 'Edit customer',
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
      </Suspense>
    </main>
  );
}