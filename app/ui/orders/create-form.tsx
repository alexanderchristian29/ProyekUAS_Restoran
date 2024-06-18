import { CustomerDropwdownField, MenuDropwdownField, OrdersField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
    CalculatorIcon,
    ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import React from 'react';
import { createOrders } from '@/app/lib/actions';

export default function Form({ orders, menus, customers }: { orders: OrdersField[], menus: MenuDropwdownField[], customers: CustomerDropwdownField[] }) {

    return (
        <form action={createOrders}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">

                {/* customer */}
                <div className="mb-4">
                    <label htmlFor="customer" className="block text-sm font-medium mb-2">
                        Customer
                    </label>
                    <div className="relative">
                        <select
                            id="customer"
                            name="customer"
                            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder-gray-500"
                        >
                            {customers.map((customer, index) => (
                                <option key={index} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* menu */}
                <div className="mb-4">
                    <label htmlFor="menu" className="block text-sm font-medium mb-2">
                        Menu
                    </label>
                    <div className="relative">
                        <select
                            id="menu"
                            name="menu"
                            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder-gray-500"
                        >
                            {menus.map((menu, index) => (
                                <option key={index} value={menu.id}>
                                    {menu.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Item */}
                <div className="mb-4">
                    <label htmlFor="item" className="block text-sm font-medium mb-2">
                        Banyak Item
                    </label>
                    <div className="relative">
                        <input
                            id="item"
                            name="item"
                            type="number"
                            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder-gray-500"
                        />
                        <CalculatorIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                {/* Item */}
                <div className="mb-4">
                    <label htmlFor="item" className="block text-sm font-medium mb-2">
                        Catatan Pesanan
                    </label>
                    <div className="relative">
                        <input
                            id="note"
                            name="note"
                            type="text"
                            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder-gray-500"
                        />
                        <ClipboardDocumentCheckIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>

            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/orders"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Order</Button>
            </div>
        </form>
    );
}
