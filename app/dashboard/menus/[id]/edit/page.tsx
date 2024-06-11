import Form from '@/app/ui/menus/edit-form';
import Breadcrumbs from '@/app/ui/menus/breadcrumbs';
import { fetchMenuById, fetchMenus } from '@/app/lib/data';
import { Suspense } from 'react';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
  const [menus] = await Promise.all([
    fetchMenuById(id),
    fetchMenus(),
  ]);
  return (
    <main>
      <Suspense>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Menus', href: '/dashboard/menus' },
          {
            label: 'Edit Menus',
            href: `/dashboard/menus/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form menus={menus} />
      </Suspense>
    </main>
  );
}