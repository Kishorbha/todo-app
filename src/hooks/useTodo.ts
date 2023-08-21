import { VTodoForm } from '@/form-validator/VTodoForm'
import { useTodoStore } from '@/store/todo'
import Api from '@/utils/Api'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

export function useTodo() {
  const a = useRef<HTMLAnchorElement | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { addTodo, updateTodo, removeTodo } = useTodoStore()
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

  const uploadTodo = (values: VTodoForm) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    api
      .post('/todos/', values)
      .then((data) => addTodo(data.data.data))
      .catch((data) => {
        toast.error(data?.message)
      })
      .finally(() => setIsSubmitting(false))
  }

  const updateT = (id: string, values: VTodoForm) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    api
      .patch(`/todos/${id}`, values)
      .then((data) => updateTodo(data.data.data))
      .catch((data) => {
        toast.error(data?.message)
      })
      .finally(() => setIsSubmitting(false))
  }

  const deleteT = (id: string) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    api
      .delete(`/todos/${id}`)
      .then((data) => removeTodo(data.data.data.deletedTodo._id))
      .catch((data) => {
        toast.error(data?.message)
      })
      .finally(() => setIsSubmitting(false))
  }

  const toggleT = (id: string) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    api
      .patch(`/todos/toggle/status/${id}`)
      .then((data) => updateTodo(data.data.data))
      .catch((data) => {
        toast.error(data?.message)
      })
      .finally(() => setIsSubmitting(false))
  }

  return {
    getTodos,
    uploadTodo,
    updateT,
    deleteT,
    toggleT,
    isSubmitting,
  }
}
