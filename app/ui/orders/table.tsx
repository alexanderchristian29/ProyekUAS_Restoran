import Image from 'next/image';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { CreateOrders, DeleteOrders, UpdateOrders } from './buttons';
import { fetchFilteredOrders } from '@/app/lib/data';

export default async function OrdersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const orders = await fetchFilteredOrders(query, currentPage);

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-2xl mb-4`}>Orders</h1>
      <div className="flex items-center justify-between gap-2 md:mt-8  md:mb-8 mb-4">
        <div className="flex-grow">
          <Search placeholder="Search nama customer atau nama menu..." />
        </div>
      </div>
      <CreateOrders />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full rounded-md text-gray-900">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Customer
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Nama Menu
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Item
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Harga Item
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total Harga
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Catatan Order
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {orders.map((order) => (
                    <tr key={order.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={order.image_url}
                            className="rounded-full"
                            alt={`${order.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{order.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {order.nama_menu}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {order.total_item}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {order.harga_menu}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {order.total_harga}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {order.notes}
                      </td>
                      <td className="whitespace-nowrap bg-white py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-2">
                          <UpdateOrders  id={order.id} />
                          <DeleteOrders id={order.id} />
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