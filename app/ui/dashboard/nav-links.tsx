import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { 
    name: 'Customers', 
    href: '/dashboard/customers', 
    icon: UserGroupIcon 
  },
  {
    name: 'Menu',
    href: '/dashboard/menus',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Order',
    href: '/dashboard/orders',
    icon: ListBulletIcon,
  },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}
