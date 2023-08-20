import AuthLayout from '@/layouts/AuthLayout'
import Head from 'next/head'
import Link from 'next/link'

export default function AuthPage() {
  return (
    <AuthLayout>
      <Head>
        <title>Todo</title>
      </Head>
      <div className='flex flex-col gap-10 '>
        <h3 className='font-extrabold text-center text-4xl '>Welcome Back !</h3>
        <Link
          href='/auth/login'
          className='outline outline-2 outline-orange-300 w-full shadow-lg shadow-orange-400/50 rounded-lg p-4 text-center text-gray-400 font-bold uppercase'
        >
          Login
        </Link>
        <Link
          href='/auth/signup'
          className='outline outline-2 outline-red-300 w-full shadow-lg shadow-red-400/50 rounded-lg p-4 text-center text-gray-400 font-bold uppercase'
        >
          signup
        </Link>
      </div>
    </AuthLayout>
  )
}
