import { FC, Fragment } from 'react'
import { AnswersProps } from '../../../types'

const Answers: FC<AnswersProps> = ({ answer }) => {
  return (
    <Fragment>
      <div
        style={{ borderBottom: '0.5px solid #ddd' }}
        className={` w-full text-sm leading-6 text-font-secondary p-4`}
      >
        {answer}
      </div>
    </Fragment>
  )
}

export default Answers
