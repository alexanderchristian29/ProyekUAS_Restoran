import { ArrowRightCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { inter } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-no-repeat bg-cover bg-center" style={{backgroundImage: "url('/layout/images/bg-resto.jpg')"}}>
       <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg px-6 py-10 md:w-2/5 md:px-20">
        <header className="fixed inset-x-0 top-0 z-10 w-full bg-transparent flex justify-between items-center px-10 py-2">
          <div className={`${inter.className} text-2xl leading-3xl flex items-center`}>
            <Image
            src="/layout/logo/BakarSeafood.svg"
            alt="logo"
            width={40}
            height={40}
            style={{
              marginRight: '20px',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center',
              overflow: 'hidden'
            }}
            />
            <p className='text-yellow-200'>Atma Restorant</p>
          </div>
          <button className="px-5 py-1 text-yellow-300 hover:underline md:hidden">
              <UserIcon className="w-7" />
          </button>
          <Link href='/login'>
            <button className="px-5 py-1 text-gray-400 border-yellow-200 border-2 bg-yellow-100 rounded-lg hover:underline hidden md:block">
                Login
            </button>
          </Link>
      </header>
          <p
      className={`${inter.className} text-2xl text-yellow-500 md:text-2xl md:leading-normal`}
    >
        Bakar Seafood
          </p>
          <p
      className={`${inter.className} text-6xl text-yellow-100 md:text-5xl md:leading-normal`}
    >
         Our Restorant Admin Dashboard
          </p>
          <Link
            href= '/dashboard'
          >
            <h1
            className={`${inter.className} antialiased flex text-gray-200 
            text-[20px] hover:text-yellow-200`}
          >
            Go to Dashboard
            <ArrowRightCircleIcon className='w-6 mx-2'/>
            </h1>
          </Link>
 
        </div>
      </div>
    </main>
  );
}