import clsx from 'clsx'
import { FormEvent, useState } from 'react'
import TodoCreateForm from './TodoCreateForm'

interface TodoPopupProps {
  onClosePopup: () => void
}

const TodoPopup = ({ onClosePopup }: TodoPopupProps) => {
  const handleEditTodoItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onClosePopup()
  }

  return (
    <div
      className={clsx(
        'fixed bottom-0 left-0 right-0 top-0 z-50',
        'flex items-center justify-center bg-gray-700/60 p-4',
      )}
    >
      <div className='w-full max-w-md'>
        <TodoCreateForm onClosePopup={onClosePopup} />
      </div>
    </div>
  )
}

export default TodoPopup
