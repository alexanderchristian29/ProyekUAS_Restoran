import Image from 'next/image';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
// import { UpdateCustomers, CreateCustomers,DeleteCustomers } from './buttons';
import { fetchFilteredMenus } from '@/app/lib/data';
import clsx from 'clsx';

export default async function MenusTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const menus = await fetchFilteredMenus(query, currentPage);

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-2xl mb-4`}>Menus</h1>
      <div className="flex items-center justify-between gap-2 md:mt-8">
        <div className="flex-grow">
          <Search placeholder="Search nama customer atau nama menu..." />
        </div>
        {/* <CreateCustomers /> */}
      </div>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full rounded-md text-gray-900">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Nama
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Kategori
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Harga
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Kesediaan
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {menus.map((menu) => (
                    <tr key={menu.id} className="group">
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {menu.name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {menu.category}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {menu.price}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {/* {menu.available ? 'Tersedia' : 'Tidak Tersedia'}
                         */}
                          <span
                            className={clsx(
                              'inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium md:text-sm',
                              {
                                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': menu.available === true,
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': menu.available === false,
                              }
                            )}
                          >
                          {menu.available ? 'Tersedia' : 'Tidak Tersedia'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap bg-white py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-2">
                          {/* <UpdateCustomers id={customer.id} />
                          <DeleteCustomers id={customer.id} /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}