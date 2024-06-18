import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { kanit, anton, lusitana } from '@/app/ui/fonts';
import { ArrowRightEndOnRectangleIcon,  ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
 
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-yellow-400">
      <Link
        className="mb-2 flex h-20 items-center justify-start rounded-md p-4 md:h-40 bg-[#358E9D]"
        href="/dashboard"
      >
        <img src="/layout/logo/BakarSeafood.svg" 
          alt="Logo" 
          className="mr-3" 
          style={{
            borderRadius: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            overflow: 'hidden'
          }} 
        />
        <p
          className={`${lusitana.className} text-3xl text-white md:text-3xl md:leading-normal`}
        >
        Atma Restorant
          </p>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 " >
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form className="flex flex-row md:flex-col">
          <Link
            href= '/'
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 mb-2 mr-2">
              < ArrowUturnLeftIcon
              className="w-6" />
              <div className={`${lusitana.className} font-bold hidden md:block`}>Back</div>
          </Link>
        </form>
           <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <ArrowRightEndOnRectangleIcon className="w-6" />
                <div className={`${lusitana.className} font-bold hidden md:block`}>Sign Out</div>
              </button>
            </form>
      </div>
    </div>
  );
}