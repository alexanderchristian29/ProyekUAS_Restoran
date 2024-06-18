import LoginForm from '@app/ui/login-form';

export default function Login() {
  return (
    <div className='relative w-full h-screen bg-zinc-900/50 '>
      <img className='absolute w-full h-full object-cover mix-blend-color-burn ' src={'/layout/images/bg-resto.jpg'} alt="/" />
      <div className='flex flex-col justify-center items-center h-full '>
        <LoginForm />
      </div>
    </div>
  )
}
