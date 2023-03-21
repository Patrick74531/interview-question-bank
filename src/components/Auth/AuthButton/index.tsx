import { LockClosedIcon } from '@heroicons/react/20/solid'
import { FC } from 'react'

type AuthButtonType = {
  name: string
}
const AuthButton: FC<AuthButtonType> = ({ name }) => {
  return (
    <div>
      <button
        type='submit'
        className='group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      >
        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
          <LockClosedIcon
            className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
            aria-hidden='true'
          />
        </span>
        {name}
      </button>
    </div>
  )
}

export default AuthButton
