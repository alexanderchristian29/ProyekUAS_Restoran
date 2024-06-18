"use client";

import { useState } from 'react';
import { OrderForm } from '@/app/lib/definitions';
import {
    BanknotesIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateMenus } from '@/app/lib/actions';

export default function EditInvoiceForm({
    orders,
}: {
    orders: OrderForm;
}) {
    const updateMenusById = updateMenus.bind(null, orders.id);
    const [formState, setFormState] = useState<OrderForm>({
        id: orders.id,
        invoice_id: orders.invoice_id,
        menu_id: orders.menu_id,
        order_date: orders.order_date,
        order_time: orders.order_time,
        total_items: orders.total_items,
        notes: orders.notes
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
                <div className="flex items-center gap-4">
                    <DocumentTextIcon className="w-6 h-6 text-gray-500" />
                    <input
                        type="text"
                        name="invoice_id"
                        value={formState.invoice_id}
                        onChange={handleInputChange}
                        placeholder="Invoice ID"
                        className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
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
