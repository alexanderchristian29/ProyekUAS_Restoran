import { deleteMenus } from "@/app/lib/actions";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateMenus() {
    return (
        <div className="flex justify-end">
            <Link
                href="/dashboard/menus/create"
                className="flex h-10 w-fit justify-center items-center rounded-lg bg-yellow-400 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-yellow-400"
            >
                <span className="hidden md:block">Create Menu</span>{' '}
                <PlusIcon className="h-5 md:ml-4" />
            </Link>
        </div>
    );
}

export function DeleteMenus({ id }: { id: string }) {
    const deleteCustomerById = deleteMenus.bind(null, id);
    return (
        <form action={deleteCustomerById}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}