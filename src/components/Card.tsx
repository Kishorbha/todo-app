import { useTodo } from '@/hooks/useTodo'
import TodoEditPopup from '@/modules/todo/TodoEditPopup'
import clsx from 'clsx'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { LuVerified } from 'react-icons/lu'
import { GoUnverified } from 'react-icons/go'

export default function Card({ ...props }) {
  const [show, setShow] = useState(false)
  const { deleteT, toggleT } = useTodo()
  return (
    <div
      className={clsx(
        'card w-96  text-primary-content',
        props.isComplete ? 'bg-green-500' : 'bg-red-500',
      )}
    >
      <div className='card-body '>
        <div className=' flex justify-between'>
          <h2 className='card-title'>{props.title}</h2>
          {props.isComplete ? (
            <button>
              <LuVerified size={25} />
            </button>
          ) : (
            <button onClick={() => toggleT(props._id)}>
              <GoUnverified size={25} />
            </button>
          )}
        </div>
        <p>{props.description}</p>
        <div className='card-actions flex justify-between mt-4'>
          <button className='text-white' onClick={() => deleteT(props._id)}>
            <FaTrash />
          </button>
          <button className='text-white' onClick={() => setShow(true)}>
            <MdEdit />
          </button>
        </div>
      </div>
      {show && <TodoEditPopup data={props} onClosePopup={setShow} />}
    </div>
  )
}
