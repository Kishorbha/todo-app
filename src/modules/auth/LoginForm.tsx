import { VLoginForm } from '@/form-validator/VLoginForm'
import { useAuth } from '@/hooks/useAuth'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { ChangeEvent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const LoginForm: React.FC<{}> = () => {
  const { login, isSubmitting } = useAuth()
  const { control, handleSubmit } = useForm<VLoginForm>({
    resolver: classValidatorResolver(VLoginForm),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [show, setShow] = useState(true)

  const onSubmit = (values: VLoginForm) => login(values)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className='flex flex-col gap-y-2 w-full'>
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
      <div className='mt-4 flex justify-between font-semibold text-sm'>
        <label className='flex text-slate-500 hover:text-slate-600 cursor-pointer'>
          <input
            className='mr-1'
            type='checkbox'
            onClick={() => setShow(!show)}
          />
          <span>Show password</span>
        </label>
        <a
          className='text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4'
          href='# '
        >
          Forgot Password?
        </a>
      </div>
      <div className='text-center md:text-left'>
        <button
          disabled={isSubmitting}
          className='mt-4 bg-orange-300 hover:bg-orange-400 px-4 py-2 text-white uppercase rounded text-xs tracking-wider'
          type='submit'
        >
          Login
        </button>
      </div>
    </form>
  )
}

export default LoginForm
