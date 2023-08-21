import { VForgotPasswordForm } from '@/form-validator/VForgotPasswordForm'
import { VLoginForm } from '@/form-validator/VLoginForm'
import { VResetPasswordForm } from '@/form-validator/VResetPasswordForm'
import { VSignupForm } from '@/form-validator/VSignupForm'
import Api from '@/utils/Api'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

export function useAuth() {
  const a = useRef<HTMLAnchorElement | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter()
  const api = Api()

  useEffect(() => {
    a.current = document.createElement('a')
    a.current.href = '/'
    a.current.hidden = true
  }, [])

  const signup = (values: VSignupForm) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    api
      .post('/users/register', values)
      .then(({ data }) => {
        document.cookie = `user=${JSON.stringify(
          data.data.user,
        )}; path=/; domain=${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`
        a.current?.click()
        toast.success(data?.message)
      })
      .catch(({ response: { data } }) => {
        toast.error(data?.message)
      })
      .finally(() => setIsSubmitting(false))
  }

  const login = (values: VLoginForm) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    api
      .post('/users/login', values)
      .then(({ data }) => {
        document.cookie = `user=${JSON.stringify(
          data?.data?.user,
        )}; path=/; domain=${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`
        a.current?.click()
      })
      .catch(({ response: { data } }) => {
        console.log(data)
        toast.error(data?.message)
      })
      .finally(() => setIsSubmitting(false))
  }

  const forgotPassword = (values: VForgotPasswordForm) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    api
      .post('/users/forgot-password', values)
      .then(() => {
        toast.success('Password reset mail has been sent to your mailbox.')
      })
      .catch(({ response: { data } }) => {
        toast.error(data?.message)
      })
      .finally(() => setIsSubmitting(false))
  }

  const resetPassword = (values: VResetPasswordForm) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    api
      .patch(`/users/reset-password`, { ...values, token: router.query.token })
      .then(({ data }) => {
        toast.success('Password updated')
        router.push('/auth/login')
      })
      .catch(({ response: { data } }) => {
        toast.error(data?.message)
      })
      .finally(() => setIsSubmitting(false))
  }

  const logout = () => {
    toast.promise(
      (async () => {
        await api.post('/users/logout')
      })(),
      {
        loading: 'Loading...',
        success: () => {
          if (a.current) {
            a.current.href = '/auth'
            a.current.click()
          }
          return 'Logging out'
        },
        error: ({ response: { data } }: any) => toast.error(data.message),
      },
    )
  }

  return {
    isSubmitting,
    login,
    signup,
    forgotPassword,
    resetPassword,
    logout,
  }
}
