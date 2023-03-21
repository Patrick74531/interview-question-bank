import { useState } from 'react'
import AuthButton from '../../../components/Auth/AuthButton'
import AuthInput from '../../../components/Auth/AuthInput'
import Loader from '../../Loader'
import ErrorModal from '../ErrorModal'
import { useNavigate } from 'react-router-dom'
import { useHttpClient } from '../../../hooks/httpHooks'
import { useUsers } from '../../../context/UserContext'

const Login = () => {
  const [emailInput, setEmailInput] = useState()
  const [pwdInput, setPwdInput] = useState()
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState()
  // const [isOpen, setIsOpen] = useState(false)

  const { isLoading, error, sendRequest, setIsOpen, isOpen }: any =
    useHttpClient()

  const { login } = useUsers()
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const emailinputHandler = (e: any) => {
    setEmailInput(e.target.value)
  }
  const pwdInputHandler = (e: any) => {
    setPwdInput(e.target.value)
  }
  const authSubmitHandler = async (e: any) => {
    e.preventDefault()
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        'POST',
        JSON.stringify({
          email: emailInput,
          password: pwdInput,
        }),
        {
          'Content-Type': 'application/json',
        }
      )

      const userData = {
        email: responseData.email,
        id: responseData.userId,
        name: responseData.name,
        token: responseData.token,
        posts: [],
      }

      login(userData)
      navigate('/')
    } catch (err) {}
  }

  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-1/2'>
      {isLoading && <Loader />}
      {<ErrorModal isOpen={isOpen} onClose={handleCloseModal} error={error} />}
      <div className='w-full max-w-md space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Your Company'
          />
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
          {/* <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <a
              href='#'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              start your 14-day free trial
            </a>
          </p> */}
        </div>
        <form
          className='mt-8 space-y-6'
          action='#'
          method='POST'
          onSubmit={authSubmitHandler}
        >
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='-space-y-px rounded-md shadow-sm'>
            <AuthInput
              type='email'
              placeholder='Email address'
              name='email-address'
              inputHandler={emailinputHandler}
            />
            <AuthInput
              type='password'
              placeholder='password'
              name='password'
              inputHandler={pwdInputHandler}
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
              />
              <label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-gray-900'
              >
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <span className='font-medium text-indigo-600 hover:text-indigo-500'>
                Forgot your password?
              </span>
            </div>
          </div>

          <AuthButton name='Sign in' />
        </form>
      </div>
    </div>
  )
}

export default Login
