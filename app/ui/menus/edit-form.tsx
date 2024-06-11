"use client";

import { useState } from 'react';
import { MenuForm } from '@/app/lib/definitions';
import {
    BanknotesIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateMenus } from '@/app/lib/actions';

export default function EditInvoiceForm({
    menus,
}: {
    menus: MenuForm;
}) {
    const updateMenusById = updateMenus.bind(null, menus.id);
    const [formState, setFormState] = useState<MenuForm>({
        id: menus.id,
        name: menus.name,
        price: menus.price,
        category: menus.category,
        available: menus.available
    });
    console.log(formState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // If it's a checkbox, handle the checked property
        const newValue = type === 'checkbox' ? "true" : value;

        setFormState({
            ...formState,
            [name]: newValue,
        });
    };


    return (
        <form action={updateMenusById}>
            <input type="hidden" name="id" value={formState.id} />
           <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Menu Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formState.name}
                            onChange={handleInputChange}
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
                            value={formState.price}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder-gray-500"
                        />
                        <BanknotesIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Kategori */}
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium mb-2">
                        Kategori
                    </label>
                    <div className="relative">
                        <select
                            id="category"
                            name="category"
                            value={formState.category}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder-gray-500"
                        >
                            <option value="Main Course">Main Course</option>
                            <option value="Starter">Starter</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Beverage">Beverage</option>
                        </select>
                    </div>
                </div>

                {/* Kesediaan */}
                <div className="mb-4">
                    <label htmlFor="available" className="block text-sm font-medium mb-2">
                        Kesediaan
                    </label>
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="available"
                            name="available"
                            value={formState.available ? "true" : "false"}
                            onChange={handleInputChange}
                            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
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
                <Button type="submit">Edit Menu</Button>
            </div>
        </form>
    );
}
