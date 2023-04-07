import { ChangeEvent, FormEvent, useState } from 'react'
import AuthButton from '../../../components/Auth/AuthButton'
import AuthInput from '../../../components/Auth/AuthInput'
import Loader from '../../SharedComponents/Loader'
import ErrorModal from '../ErrorModal'
import { useNavigate } from 'react-router-dom'
import { useHttpClient } from '../../../hooks/httpHooks'
import { useUsers } from '../../../context/UserContext'

const Signup = () => {
  const [emailInput, setEmailInput] = useState('')
  const [pwdInput, setPwdInput] = useState('')
  const [nameInput, setNameInput] = useState('')

  const { isLoading, error, sendRequest, setIsOpen, isOpen } = useHttpClient()
  const { login } = useUsers()
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const emailinputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value)
  }
  const pwdInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPwdInput(e.target.value)
  }
  const nameInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value)
  }
  const authSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
      'POST',
      JSON.stringify({
        email: emailInput,
        password: pwdInput,
        name: nameInput,
      }),
      {
        'Content-Type': 'application/json',
      }
    )
    if (responseData) {
      const { email, name, token, userId } = responseData
      const user = {
        email,
        name,
        id: userId,
        token,
        posts: [],
      }
      login(user)
      navigate('/')
    } else {
      console.error('Error: Response data is undefined.')
    }
  }

  return (
    <>
      {<ErrorModal isOpen={isOpen} onClose={handleCloseModal} error={error} />}

      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-1/2'>
        {isLoading && <Loader />}

        <div className='w-full max-w-md space-y-8'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt='Your Company'
            />
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Sign up account
            </h2>
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
                type='text'
                placeholder='input name'
                name='name'
                inputHandler={nameInputHandler}
              />

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

            <AuthButton name='Sign up' />
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
