import { ReactNode } from 'react'
import { IUserList } from '@/types/IUserList'
import UserProvider from './UserContext'

interface AuxProps {
  children: ReactNode
  user?: IUserList
}

const AppProvider: React.FC<AuxProps> = ({ children, user }) => {
  return <UserProvider user={user}>{children}</UserProvider>
}

export default AppProvider
