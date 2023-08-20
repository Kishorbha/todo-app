import { VSignupForm } from '@/form-validator/VSignupForm'
import { useAuth } from '@/hooks/useAuth'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const RegisterForm: React.FC<{}> = () => {
  const { signup, isSubmitting } = useAuth()
  const { control, handleSubmit } = useForm<VSignupForm>({
    resolver: classValidatorResolver(VSignupForm),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const [show, setShow] = useState(true)

  const onSubmit = (values: VSignupForm) => signup(values)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='fullname'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='flex flex-col gap-y-2 w-full mb-5'>
            <input
              value={field.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value)
              }}
              className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded'
              type='text'
              placeholder='Full Name'
            />

            {error && (
              <p className=' text-xs font-normal text-red-600'>
                {error.message}
              </p>
            )}
          </div>
        )}
      />
      <Controller
        name='email'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='flex flex-col gap-y-2 w-full mb-5'>
            <input
              value={field.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value)
              }}
              className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded'
              type='text'
              placeholder='Email Address'
            />

            {error && (
              <p className=' text-xs font-normal text-red-600'>
                {error.message}
              </p>
            )}
          </div>
        )}
      />
      <Controller
        name='password'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='flex flex-col gap-y-2 w-full mb-5'>
            <input
              value={field.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value)
              }}
              className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded'
              type={show ? 'password' : 'text'}
              placeholder='Password'
            />

            {error && (
              <p className=' text-xs font-normal text-red-600'>
                {error.message}
              </p>
            )}
          </div>
        )}
      />
      <Controller
        name='confirmPassword'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className='flex flex-col gap-y-2 w-full mb-5'>
            <input
              value={field.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value)
              }}
              className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded'
              type={show ? 'password' : 'text'}
              placeholder='confirmPassword'
            />

            {error && (
              <p className=' text-xs font-normal text-red-600'>
                {error.message}
              </p>
            )}
          </div>
        )}
      />
      <div className='mt-4 flex justify-between font-semibold text-sm'>
        <label className='text-slate-500'>
          Already a member?{' '}
          <Link
            className='text-blue-600 mx-1 hover:text-blue-700  font-semibold hover:underline hover:underline-offset-4'
            href='/auth/login'
          >
            Login
          </Link>
        </label>
        <label className='flex text-slate-500 hover:text-slate-600 cursor-pointer'>
          <input
            className='mr-1'
            type='checkbox'
            onClick={() => setShow(!show)}
          />
          <span>Show password</span>
        </label>
      </div>

      <div className='text-center md:text-left'>
        <button
          disabled={isSubmitting}
          className='mt-4 bg-orange-300 hover:bg-orange-400 px-4 py-2 text-white uppercase rounded text-xs tracking-wider'
          type='submit'
        >
          Register
        </button>
      </div>
    </form>
  )
}

export default RegisterForm
