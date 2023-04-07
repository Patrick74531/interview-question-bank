import { FC } from 'react'
import { PrimaryButtonType } from '../../../types'

const PrimaryButton: FC<PrimaryButtonType> = ({
  handleClick,
  ariaLabel,
  title,
  type,
}) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      className='bg-btn-primary  hover:bg-purple-700 text-white h-10 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mt-3'
      aria-label={ariaLabel}
    >
      {title}
    </button>
  )
}

export default PrimaryButton
