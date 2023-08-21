import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

const Filter: React.FC<{}> = () => {
  const router = useRouter()
  return (
    <div className='py-4 flex justify-center mt-5 '>
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
            router.query.sort === 'incomplete' ? 'bg-red-600 text-white' : '',
          )}
          href={{ pathname: '/', query: { sort: 'incomplete' } }}
        >
          Incomplete
        </Link>
        <Link
          className={clsx(
            'tab',
            router.query.sort === 'complete' ? ' bg-green-600 text-white' : '',
          )}
          href={{ pathname: '/', query: { sort: 'complete' } }}
        >
          Completed
        </Link>
      </div>
    </div>
  )
}

export { Filter }
