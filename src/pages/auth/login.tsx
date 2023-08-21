import AuthLayout from '@/layouts/AuthLayout'
import Head from 'next/head'
import LoginForm from '../../modules/auth/LoginForm'
import Link from 'next/link'
import { SiAuth0 } from 'react-icons/si'
import { FcGoogle } from 'react-icons/fc'
import config from '@/config'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
  const { loginViaSocial } = useAuth()
  return (
    <AuthLayout>
      <Head>
        <title>Todo | Login</title>
      </Head>
      <div className='flex flex-col gap-2 '>
        <h3 className='font-extrabold text-center text-4xl text-gray-700 mb-4 '>
          Welcome Back !
        </h3>
        <LoginForm />
        <div className=' font-semibold text-sm text-slate-500 text-center md:text-left'>
          Don&apos;t have an account?{' '}
          <Link
            className='text-red-600 hover:underline hover:underline-offset-4'
            href='/auth/signup'
          >
            Register
          </Link>
        </div>
        <div className='my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-orange-300 after:mt-0.5 after:flex-1 after:border-t after:border-orange-300'>
          <p className='mx-4 mb-0 text-center font-semibold text-slate-500'>
            Or
          </p>
        </div>
        <div className='text-center md:text-center'>
          <button
            onClick={() => loginViaSocial('auth0')}
            type='button'
            className='mx-4 p-4 text-center rounded-full  text-amber-900  shadow-[0_4px_9px_-4px_#d7843b]'
          >
            <SiAuth0 size='30' />
          </button>
          <button
            onClick={() => loginViaSocial('google')}
            type='button'
            className='mx-4  p-4 text-center rounded-full  text-amber-900  shadow-[0_4px_9px_-4px_#d7843b]'
          >
            <FcGoogle size='30' />
          </button>
        </div>
      </div>
    </AuthLayout>
  )
}
