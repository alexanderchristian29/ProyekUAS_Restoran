'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '@layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    console.log(email);
    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 100%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src="/layout/logo/BakarSeafood.svg" alt="Logo" height="200" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, Bakar Seafood Restaurant</div>
                            <div className="text-600 font-medium mb-3">Comfortable Service</div>
                            <div className="text-red-400">Yummy Food!</div>
                        </div>

                         <div className="flex flex-column gap-2 mb-5">
                            <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText 
                                id="email" 
                                type="text" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                keyfilter={'email'}
                                placeholder="Masukkan email anda" 
                                className="w-full md:w-30rem p-3" 
                            />
                            {
                                email && email.length < 2 &&
                                <small id="username-help" className=' text-red-400'>
                                    Enter your real email
                                </small>
                            }
                        </div>
                        <div className="flex flex-column gap-2 mb-2">
                            <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password 
                                inputId="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                toggleMask
                                placeholder="Password" 
                                className="w-ful" 
                                inputClassName="w-full p-3 md:w-30rem"
                                weakLabel="Minimal 8 karakter, huruf besar, huruf kecil dan angka" 
                                mediumLabel="Minimal 8 karakter, huruf besar, huruf kecil dan angka" 
                                strongLabel="Complex password"
                            ></Password>
                            {
                                password && password.length < 10 &&
                                <small id="username-help" className=' text-red-400'>
                                    Enter your real email
                                </small>
                            }
                        </div>
                        <div className="flex align-items-center justify-content-between mb-5 gap-5">
                            <a className="font-medium no-underline ml-2 text-right cursor-pointer" onClick={() => alert('lupa password')}>
                                Forgot password?
                            </a>
                        </div>
                        <Button label="Login" className="w-full p-3 text-xl bg-orange-500 hover:bg-orange-300 focus:bg-orange-400" onClick={() => router.push('/')}></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
