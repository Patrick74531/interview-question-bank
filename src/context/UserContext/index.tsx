import { createContext, useState, useCallback, FC, useContext } from 'react'
import { IUserContext, UserType } from '../../types'

export const UserContext = createContext<IUserContext>({
  isLoggedIn: false,
  user: {
    email: '',
    id: '',
    name: '',
    posts: [],
    token: null,
  },
  login: () => {},
  logout: () => {},
  expirationDateState: null,
})

interface Props {
  children: React.ReactNode
}

export const UsersProvider: FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    email: '',
    id: '',
    name: '',
    posts: [],
    token: null,
  })
  const [expirationDateState, setExpirationDateState] = useState(null)

  const login = useCallback((u: UserType, expirationDate: any) => {
    setIsLoggedIn(true)
    setUser(u)
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setExpirationDateState(tokenExpirationDate)
    const { id, email, name, token, posts } = u
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: id,
        token,
        name,
        posts,
        email,
        expiration: tokenExpirationDate.toISOString(),
        //when transfer to ISO, it can be pass in Date() as a parameter
      })
    )
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setExpirationDateState(null)
    setUser({
      email: '',
      id: '',
      name: '',
      posts: [],
      token: null,
    })
    localStorage.removeItem('userData')
  }, [])

  return (
    <UserContext.Provider
      value={{ isLoggedIn, user, login, logout, expirationDateState }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUsers = () => useContext(UserContext)
