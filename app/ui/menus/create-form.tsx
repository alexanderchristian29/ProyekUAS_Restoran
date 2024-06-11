import { MenuField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
    DocumentTextIcon,
    BanknotesIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createMenus } from '@/app/lib/actions';

export default function Form({ menus }: { menus: MenuField[] }) {
    return (
        <form action={createMenus} >
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Customer Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter menu name"
                            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder-gray-500"
                        />
                        <DocumentTextIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Harga */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium mb-2">
                        Harga
                    </label>
                    <div className="relative">
                        <input
                            id="price"
                            name="price"
                            type="number"
                            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder-gray-500"
                        />
                        <BanknotesIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Kategori */}
                <div className="mb-4">
                    <label htmlFor="alamat" className="block text-sm font-medium mb-2">
                        Kategori
                    </label>
                    <div className="relative">
                        <select
                            id="category"
                            name="category"
                            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder-gray-500"
                        >
                            <option value="Main Course">Main Course</option>
                            <option value="Starter">Starter</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Beverage">Beverage</option>
                        </select>
                    </div>
                </div>

                {/* Image */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium mb-2">
                        Kesediaan
                    </label>
                    <div className="relative">
                        <input type='checkbox' id='available' name='available' value='true' className='form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out' />
                        <span className="ml-2">
                            Tersedia
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/menus"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Menu</Button>
            </div>
        </form>
    );
}