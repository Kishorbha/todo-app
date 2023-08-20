import Api from '@/utils/Api'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

export function useTodo() {
  const a = useRef<HTMLAnchorElement | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const api = Api()

  useEffect(() => {
    a.current = document.createElement('a')
    a.current.href = '/'
    a.current.hidden = true
  }, [])

  const getTodos = () => {
    if (isSubmitting) return

    setIsSubmitting(true)
    api
      .get(`/todos`)
      .then((data) => data.data)
      .catch(({ response: { data } }) => {
        toast.error(data?.message)
      })
      .finally(() => setIsSubmitting(false))
  }

  return {
    getTodos,
  }
}
