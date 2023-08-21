import { IUserList } from '@/types/IUserList'

const Header: React.FC<{ user: IUserList }> = ({ user }) => {
  return (
    <h1 className='py-3 text-center text-4xl font-bold text-gray-900'>
      <span className='bg-gradient-to-r from-blue-400 to-orange-600 bg-clip-text text-transparent'>
        Welcome
      </span>
      &nbsp;
      <span>{user?.fullname}</span>
    </h1>
  )
}

export { Header }
