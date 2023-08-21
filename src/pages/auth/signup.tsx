import Link from 'next/link'
import { SiAuth0 } from 'react-icons/si'
import { FcGoogle } from 'react-icons/fc'
import AuthLayout from '@/layouts/AuthLayout'
import Head from 'next/head'
import RegisterForm from '@/modules/auth/RegisterForm'
import config from '@/config'

export default function Signup() {
  return (
    <AuthLayout>
      <Head>
        <title>Todo | Register</title>
      </Head>
      <div className='flex flex-col gap-10 '>
        <h3 className='font-extrabold text-center text-4xl text-gray-700 '>
          Register
        </h3>
        <RegisterForm />

        <div className='my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-orange-300 after:mt-0.5 after:flex-1 after:border-t after:border-orange-300'>
          <p className='mx-4 mb-0 text-center font-semibold text-slate-500'>
            Or
          </p>
        </div>
        <div className='text-center md:text-center '>
          <Link
            href={`${config.server_url}/users/auth0`}
            type='button'
            className='mx-4 p-4 text-center rounded-full  text-amber-900  shadow-[0_4px_9px_-4px_#d7843b]'
          >
            <SiAuth0 size='30' />
          </Link>
          <Link
            href={`${config.server_url}/users/google`}
            type='button'
            className='mx-4  p-4 text-center rounded-full  text-amber-900  shadow-[0_4px_9px_-4px_#d7843b]'
          >
            <FcGoogle size='30' />
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
