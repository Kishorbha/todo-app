import { FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ITodo } from '@/types/ITodo'
import Card from '@/components/Card'

const TodoList: React.FC<{ todo: ITodo[] }> = ({ todo }) => {
  const router = useRouter()
  return (
    <div className='flex flex-wrap gap-4 justify-center '>
      {router.query.sort === 'complete' && (
        <>
          {todo
            .filter((opt: ITodo) => opt.isComplete)
            .map((data: ITodo) => (
              <Card {...data} key={data._id} />
            ))}
        </>
      )}
      {router.query.sort === 'incomplete' && (
        <>
          {todo
            .filter((opt: ITodo) => !opt.isComplete)
            .map((data: ITodo) => (
              <Card {...data} key={data._id} />
            ))}
        </>
      )}
      {router.query.sort !== 'incomplete' &&
        router.query.sort !== 'complete' && (
          <>
            {todo.map((data: ITodo) => (
              <Card {...data} key={data._id} />
            ))}
          </>
        )}
    </div>
  )
}

export { TodoList }
