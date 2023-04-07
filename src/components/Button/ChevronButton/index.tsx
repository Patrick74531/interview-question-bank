import { FC } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { ChevronButtonType } from '../../../types'

const ChevronButton: FC<ChevronButtonType> = ({
  isOpen,
  handleClick,
  toggleButtonLabel,
}) => {
  return (
    <div className='mt-5 flex flex-col items-center justify-center'>
      <button
        onClick={handleClick}
        className='flex items-center  text-link-blue text-sm cursor-pointer'
        aria-label={toggleButtonLabel}
      >
        {isOpen ? (
          <ChevronUpIcon data-testid='chevron-up-icon' className='w-5' />
        ) : (
          <ChevronDownIcon data-testid='chevron-down-icon' className='w-5' />
        )}
        <span>More</span>
      </button>
    </div>
  )
}

export default ChevronButton
