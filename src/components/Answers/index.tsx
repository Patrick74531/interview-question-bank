import { FC } from 'react'

type AnswersProps = {
  answer: string
  isAnswerOpen: boolean
  userId: string
}
const Answers: FC<AnswersProps> = ({ isAnswerOpen, answer }) => {
  return (
    <div
      style={{ borderBottom: '0.5px solid #ddd' }}
      className={`${
        isAnswerOpen ? 'block' : 'hidden'
      } mt-2 w-full text-sm leading-6 text-font-secondary p-4`}
    >
      {answer}
    </div>
  )
}

export default Answers
