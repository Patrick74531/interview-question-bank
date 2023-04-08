import { useEffect } from 'react'
import Auth from './pages/Auth'
import QuestionBank from './components/QuestionBank'
import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/Navigation'
import { useUsers } from './context/UserContext'
import NotFound from './pages/NotFound'

const App = () => {
  const industryName = [
    'accounting',
    'administration',
    'engineering',
    'education',
    'government',
    'it',
    'others',
  ]
  const { login, user, expirationDateState, logout } = useUsers()
  const { token } = user
  useEffect(() => {
    let storedData
    const storedDataString = localStorage.getItem('userData')

    if (storedDataString !== null) {
      storedData = JSON.parse(storedDataString)
      const { email, name, posts, token, userId, expiration } = storedData
      const userData = { email, name, id: userId, posts, token }

      if (storedData && storedData.token && new Date(expiration) > new Date()) {
        login(userData, new Date(expiration))
      }
    }
  }, [login])

  useEffect(() => {
    let logoutTimer
    if (token && expirationDateState) {
      const remainingTime = expirationDateState.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, expirationDateState, logout])

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<QuestionBank industry='' />} />
          {industryName.map((item) => (
            <Route
              key={item}
              path={`/${item}`}
              element={<QuestionBank industry={item} />}
            />
          ))}
          <Route path='*' element={<NotFound />} />
        </Route>

        <Route path='/auth' element={<Auth />} />
      </Routes>
    </>
  )
}

export default App
