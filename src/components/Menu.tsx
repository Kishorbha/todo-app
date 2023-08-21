import { useUser } from '@/context/UserContext'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

export default function Menu() {
  const { logout } = useAuth()
  const { user } = useUser()
  return (
    <div className='navbar rounded-lg border-y-2 border-gray-200 p-4 shadow-md'>
      <div className='flex-1'>
        <Link href='/' className='normal-case text-xl'>
          Todo
        </Link>
      </div>
      <div className='flex-none gap-2'>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-20 rounded-full'>
              <img alt={user.fullname} src={user?.avatar.url} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
          >
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={() => logout()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
