import MasterLayout from '@/layouts/MasterLayout'
import extractUserFromReq from '@/lib/extractUserFromReq'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import clsx from 'clsx'
import extractAccessTFromReq from '@/lib/extractAccessTFromReq'
import Api from '@/utils/Api'
import { useEffect, useState } from 'react'
import { useTodoStore } from '@/store/todo'
import { FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home({ ...props }) {
  const { fetchTodo, todos } = useTodoStore()
  const [list, setList] = useState([...todos])
  const router = useRouter()
  useEffect(() => {
    fetchTodo(props.data.data)
  }, [])

  return (
    <MasterLayout>
      <div className={clsx('mx-auto w-full max-w-3xl px-4 py-6')}>
        <Head>
          <title>Welcome To Todo</title>
        </Head>

        <h1 className='py-3 text-center text-4xl font-bold text-gray-900'>
          <span className='bg-gradient-to-r from-blue-400 to-orange-600 bg-clip-text text-transparent'>
            Welcome
          </span>
          &nbsp;
          <span>{props.user?.fullname}</span>
        </h1>

        <div className='pt-5'>
          <div className='flex items-center gap-3'>
            <div className='relative w-full'>
              <input
                type='search'
                className={clsx(
                  'w-full bg-gray-50 p-4',
                  'rounded-lg border border-gray-300',
                  'text-gray-900',
                )}
                placeholder='Search Todos'
              />
              <button
                type='button'
                className={clsx(
                  'absolute bottom-2 right-2 top-2 text-white',
                  'rounded-lg bg-blue-700 px-4',
                  'hover:bg-blue-800 ',
                )}
              >
                <svg
                  className='w-4 h-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                >
                  <path
                    className='fill-white'
                    d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z'
                  />
                </svg>
              </button>
            </div>

            <button
              // onClick={() =>
              //   handleOpenTodoPopup(null, {
              //     value: '',
              //     isChecked: false,
              //   })
              // }
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

        <div className='py-4 flex justify-center  '>
          <div className='tabs tabs-boxed'>
            <Link
              href='/'
              className={clsx(
                'tab',
                router.query.sort !== 'incomplete' &&
                  router.query.sort !== 'complete' &&
                  'tab-active',
              )}
            >
              All
            </Link>
            <Link
              className={clsx(
                'tab',
                router.query.sort === 'incomplete' ? 'tab-active' : '',
              )}
              href={{ pathname: '/', query: { sort: 'incomplete' } }}
            >
              Incomplete
            </Link>
            <Link
              className={clsx(
                'tab',
                router.query.sort === 'complete' ? 'tab-active' : '',
              )}
              href={{ pathname: '/', query: { sort: 'complete' } }}
            >
              Completed
            </Link>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-4 justify-center p-4 '>
        {list &&
          list.map((data) => (
            <div
              className={clsx(
                'card w-96  text-primary-content',
                data.isComplete ? 'bg-green-500' : 'bg-red-500',
              )}
              key={data._id}
            >
              <div className='card-body '>
                <h2 className='card-title'>{data.title}</h2>
                <p>{data.description}</p>
                <div className='card-actions flex justify-between mt-4'>
                  <button className='text-white'>
                    <FaTrash />
                  </button>
                  <button className='text-white'>
                    <MdEdit />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
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
