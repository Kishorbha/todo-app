import MasterLayout from '@/layouts/MasterLayout'
import extractUserFromReq from '@/lib/extractUserFromReq'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import clsx from 'clsx'
import extractAccessTFromReq from '@/lib/extractAccessTFromReq'
import Api from '@/utils/Api'
import { useEffect, useState } from 'react'
import { useTodoStore } from '@/store/todo'
import { TodoList } from '@/modules/todo/TodoList'
import { Filter } from '@/modules/todo/Filter'
import { Header } from '@/modules/todo/Header'
import TodoPopup from '@/modules/todo/TodoPopup'

export default function Home({ ...props }) {
  const { fetchTodo, todos } = useTodoStore()
  const [showTodoPopup, setShowTodoPopup] = useState(false)

  useEffect(() => {
    fetchTodo(props.data.data)
  }, [])

  return (
    <MasterLayout>
      <div className={clsx('mx-auto w-full max-w-3xl px-4 py-6')}>
        <Head>
          <title>Welcome To Todo</title>
        </Head>
        <div className='pt-5'>
          <div className='flex items-center gap-3'>
            <div className='relative w-full'>
              <Header user={props.user} />
            </div>

            <button
              onClick={() => setShowTodoPopup(true)}
              type='button'
              className={clsx(
                'rounded-lg bg-green-600 px-4 py-2.5',
                'font-medium text-white',
                'hover:bg-green-700 ',
              )}
            >
              Add&nbsp;Todos
            </button>
          </div>
        </div>
        <Filter />
      </div>

      {todos && <TodoList todo={todos} />}
      {showTodoPopup && (
        <TodoPopup onClosePopup={() => setShowTodoPopup(null)} />
      )}
    </MasterLayout>
  )
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const user = extractUserFromReq(req)
  const token = extractAccessTFromReq(req)
  const api = Api({ token, isServer: true })

  const [{ data }] = await Promise.all([api.get('/todos')])
  return {
    props: {
      user,
      data,
    },
  }
}
