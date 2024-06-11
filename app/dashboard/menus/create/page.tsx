import Form from '@/app/ui/menus/create-form';
import Breadcrumbs from '@/app/ui//menus/breadcrumbs';
import { Suspense } from 'react';
import { fetchMenus } from '@/app/lib/data';
 
 
export default async function Page() {
  const menus = await fetchMenus();
console.log(menus);
  return (
    <main>
      <Suspense>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Menus', href: '/dashboard/menus' },
          {
            label: 'Create Menus',
            href: '/dashboard/menus/create',
            active: true,
          },
        ]}
      />
      <Form menus={[]} />
      </Suspense>
    </main>
  );
}