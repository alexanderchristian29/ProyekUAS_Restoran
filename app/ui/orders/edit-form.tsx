"use client";

import { ChangeEvent, useState } from 'react';
import { CustomerDropwdownField, MenuDropwdownField, OrderForm } from '@/app/lib/definitions';
import {
    CalculatorIcon,
    ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateOrders } from '@/app/lib/actions';

export default function EditInvoiceForm({
    orders,
    menus, 
    customers
}: {
    orders: OrderForm;
    menus: MenuDropwdownField[];
    customers: CustomerDropwdownField[];
}) {
    const updateOrdersById = updateOrders.bind(null, orders.id);
    const [formState, setFormState] = useState<OrderForm>({
        id: orders.id,
        customer_id: orders.customer_id,
        invoice_id: orders.invoice_id,
        status: orders.status,
        menu_id: orders.menu_id,
        order_date: orders.order_date,
        order_time: orders.order_time,
        total_items: orders.total_items,
        notes: orders.notes || null
    });

     const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement| any>) => {
        const { name, value, checked } = e.target;

        // Jika properti checked aktif (true), set nilai formState.available menjadi true, jika tidak, set menjadi false
        const newValue = name === 'available' ? checked : value;

        setFormState({
            ...formState,
            [name]: newValue,
        });
    };


    return (
        <form action={updateOrdersById}>
            <input type="hidden" name="id" value={formState.id} />
            <input type="hidden" name="invoices" value={formState.invoice_id} />
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
                            value={formState.customer_id}
                            disabled
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
                    <label htmlFor="menu_id" className="block text-sm font-medium mb-2">
                        Menu
                    </label>
                    <div className="relative">
                        <select
                            id="menu_id"
                            name="menu_id"
                            value={formState.menu_id}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder-gray-500"
                        >
                            {menus.map((menu, index) => (
                                <option key={index} value={menu.id} >
                                    {menu.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Item */}
                <div className="mb-4">
                    <label htmlFor="total_items" className="block text-sm font-medium mb-2">
                        Banyak Item
                    </label>
                    <div className="relative">
                        <input
                            id="total_items"
                            name="total_items"
                            type="number"
                            value={formState.total_items}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder-gray-500"
                        />
                        <CalculatorIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                {/* Item */}
                <div className="mb-4">
                    <label htmlFor="notes" className="block text-sm font-medium mb-2">
                        Catatan Pesanan
                    </label>
                    <div className="relative">
                        <input
                            id="notes"
                            name="notes"
                            type="text"
                            value={formState.notes || ''}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder-gray-500"
                        />
                        <ClipboardDocumentCheckIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* status */}
                 <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium mb-2">
                        Status Pesanan
                    </label>
                    <div className="relative">
                        <select
                            id="status"
                            name="status"
                            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder-gray-500"
                            value={formState.status}
                            onChange={handleInputChange}
                        >
                            <option value='Pending'>Belum Bayar</option>
                            <option value='Paid'>Sudah Bayar</option>
                        </select>
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
                <Button type="submit">Edit Order</Button>
            </div>
        </form>
    );
}
