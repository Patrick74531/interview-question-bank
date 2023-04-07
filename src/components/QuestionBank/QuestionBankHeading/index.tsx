import { FC } from 'react'
import { QuestionBankHeadingType } from '../../../types'
import PrimaryButton from '../../Button/PrimaryButton'
const QuestionBankHeading: FC<QuestionBankHeadingType> = ({
  scrollToLastViewedQuestion,
  title,
  subtitle,
}) => {
  const scrollToLastViewedQuestionLabel = 'Scroll to last viewed question'
  return (
    <div>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
        {title}
      </h1>
      <div className='w-full flex justify-between items-center'>
        <p className='mt-2 text-lg leading-8 text-gray-600'>{subtitle}</p>
        <PrimaryButton
          title='Bookmark'
          ariaLabel={scrollToLastViewedQuestionLabel}
          handleClick={scrollToLastViewedQuestion}
        />
      </div>
    </div>
  )
}

export default QuestionBankHeading
