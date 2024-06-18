'use client';

import { KeyIcon, AtSymbolIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
     <form 
          action={dispatch}
          className='max-w-[500px] w-full mx-auto bg-gray-800 p-8 rounded shadow-xl shadow-violet-500'>
          <div className='flex flex-row justify-center items-center text-white'>
              <img src={'/layout/logo/BakarSeafood.svg'} alt="gofit" className="w-12 h-12 rounded-full mr-2 mx-6" />
              <h2 className='text-4xl font-bold text-center py-4 px-10'>Atma Restorant</h2>
          </div>
          <div className='flex flex-col mb-4 py-2'>
              <label className='text-white text-center mix-blend-screen'>Email</label>
              <div className='relative'>
                <input className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500' id='email' type='text' name='email' placeholder='Enter email' required/>
                <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 ' />
              </div>
          </div>
          <div className='flex flex-col mb-4 py-2'>
              <label htmlFor='password' className='text-white text-center mix-blend-screen'>Password</label>
              <div className='relative'>
                <input className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500' id='password' type='password' name='password' placeholder='Enter password' required minLength={6} />
                <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 ' />
              </div>
          </div>
          <LoginButton />
           <div
            className="flex h-8 justify-center items-center mt-4 text-red-400 mix-blend-screen"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5text-center" />
                <p className="text-sm">{errorMessage}</p>
              </>
            )}
          </div>
        </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full py-3 mt-8 justify-center bg-yellow-400 text-[20px] hover:bg-yellow-200 relative text-white hover:text-gray-500 rounded-full"  aria-disabled={pending}>
      Sign In
    </Button>
  );
}
