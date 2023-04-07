import { FC } from 'react'
import { SvgIcon } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { SvgButtonType } from '../../../types'

const SvgButton: FC<SvgButtonType> = ({
  handleClick,
  isBookmarked,
  ariaLabel,
}) => {
  return (
    <button
      onClick={handleClick}
      className='absolute right-0'
      aria-label={ariaLabel}
    >
      <SvgIcon
        data-testid='bookmark-icon'
        sx={{
          color: isBookmarked ? 'lightblue' : 'grey',
          cursor: 'pointer',
          fontSize: '40px',
        }}
      >
        <BookmarkIcon />
      </SvgIcon>
    </button>
  )
}

export default SvgButton
