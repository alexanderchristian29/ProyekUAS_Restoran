import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
    UserCircleIcon,
    EnvelopeIcon,
    InboxIcon,
    FlagIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCustomers } from '@/app/lib/actions';

export default function Form({ customers }: { customers: CustomerField[] }) {
    return (
        <form action={createCustomers} >
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
                            placeholder="Enter customer name"
                            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder-gray-500"
                        />
                        <UserCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter customer email"
                            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder-gray-500"
                        />
                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label htmlFor="alamat" className="block text-sm font-medium mb-2">
                        Alamat
                    </label>
                    <div className="relative">
                        <input
                            id="alamat"
                            name="alamat"
                            type="alamat"
                            placeholder="Enter customer address"
                            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder-gray-500"
                        />
                        <FlagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Image */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium mb-2">
                        Upload Image
                    </label>
                    <div className="relative">
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept=".png"
                            className="block w-full border-gray-200 py-2 text-sm outline-2 py-2 pl-10"
                        />
                        <InboxIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/customers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Customer</Button>
            </div>
        </form>
    );
}