import { IUserList } from '@/types/IUserList'
import { createContext, useContext, useEffect, useState } from 'react'

interface IUserContext {
  user?: IUserList
  updateUser: (props: Partial<IUserList>) => void
}

const UserContext = createContext<IUserContext>({} as IUserContext)

interface UserProviderInterface {
  user?: IUserList
  children: React.ReactNode
}

export default function UserProvider({
  children,
  user,
}: UserProviderInterface) {
  const [data, setData] = useState<IUserList | undefined>(user)

  useEffect(() => {
    setData(user)
  }, [user])

  const updateUser = (props: Partial<IUserList>) => {
    document.cookie = `user=${JSON.stringify(props)}; path=/; domain=${
      process.env.NEXT_PUBLIC_COOKIE_DOMAIN
    }`
    setData((prev) => (prev ? { ...prev, ...props } : prev))
  }

  return (
    <UserContext.Provider value={{ user: data, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  return context
}
