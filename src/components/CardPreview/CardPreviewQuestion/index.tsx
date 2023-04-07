import { Fragment, FC } from 'react'
import { CardPreviewQuestionType } from '../../../types'
import SvgButton from '../../Button/SvgButton'

const CardPreviewQuestion: FC<CardPreviewQuestionType> = ({ props }) => {
  const {
    setBookmarkedId,
    isBookmarked,
    id,
    description,
    datetime,
    date,
    industry,
  } = props
  const handleBookmark = () => {
    setBookmarkedId(id)

    localStorage.setItem('lastViewedQuestion', JSON.stringify(props))
  }

  return (
    <Fragment>
      <div className='relative flex items-center gap-x-4 text-xs w-full'>
        <time dateTime={datetime} className='text-gray-500'>
          {date}
        </time>
        <div className='relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100'>
          {industry.category}
        </div>

        <SvgButton
          handleClick={handleBookmark}
          ariaLabel='Add a bookmark'
          isBookmarked={isBookmarked}
        />
      </div>
      <div className='group w-full'>
        <p className='mt-5 text-sm leading-6 text-font-primary line-clamp-3 w-full'>
          {description}
        </p>
      </div>
    </Fragment>
  )
}

export default CardPreviewQuestion
