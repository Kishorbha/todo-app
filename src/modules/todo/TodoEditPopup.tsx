import clsx from 'clsx'
import TodoEditForm from './TodoEditForm'

const TodoEditPopup = ({ ...props }) => {
  return (
    <div
      className={clsx(
        'fixed bottom-0 left-0 right-0 top-0 z-50',
        'flex items-center justify-center bg-gray-700/60 p-4',
      )}
    >
      <div className='w-full max-w-md'>
        <TodoEditForm data={props.data} onClosePopup={props.onClosePopup} />
      </div>
    </div>
  )
}

export default TodoEditPopup
