import Link from 'next/link'
import React from 'react'

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className=' min-h-screen  bg-gray-50'>
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
                <img src='https://media.istockphoto.com/id/1330965067/photo/productivity-powered-by-digital-technology.jpg?s=2048x2048&w=is&k=20&c=qmYdXiBnQAD3LvIwEB0sVvB4DYQPxKl5eePotfsfUt0=' />
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
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
;``
