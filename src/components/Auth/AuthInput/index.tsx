import { ChangeEvent, FC } from 'react'

type AuthInputType = {
  name: string
  type: string
  placeholder: string
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void
}
const AuthInput: FC<AuthInputType> = ({
  name,
  type,
  placeholder,
  inputHandler,
}) => {
  return (
    <div>
      <label htmlFor={name} className='sr-only'>
        {name}
      </label>
      <input
        name={type}
        type={type}
        required
        placeholder={placeholder}
        onChange={inputHandler}
        className='relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
      />
    </div>
  )
}

export default AuthInput
