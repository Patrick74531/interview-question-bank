import { FC } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Answers from '../Answers'
import AnswerInput from '../AnswerInput'

export type PostsType = {
  id: string
  description: string
  date: string
  datetime: string
  industry: { title: string; category: string }
  company: {
    name: string
    city: string
  }
  answers: {
    id: string
    userId: string
    answer: string
  }[]
}
const CardPreview: FC<PostsType> = (props) => {
  const { description, date, datetime, industry, company, answers, id } = props
  const [isAnswerOpen, setIsAnswerOpen] = useState(true)

  const toggleAnswer = () => setIsAnswerOpen(!isAnswerOpen)
  const handleImageError = (event: any) => {
    event.target.onerror = null
    event.target.src = 'no-image.png'
  }
  // const getInterviewAnswer = async () => {
  //   console.log('fire')
  //   try {
  //     const responseData = await sendRequest(
  //       'http://localhost:5000/api/openai/interview-question',
  //       'POST',
  //       JSON.stringify({
  //         question: 'what difference between Tailwind and MUI?',
  //       }),
  //       {
  //         'Content-Type': 'application/json',
  //       }
  //     )
  //     console.log(responseData.answer)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <article className='flex max-w-3xl flex-col items-start justify-between w-full'>
      <div className='flex items-center gap-x-4 text-xs'>
        <time dateTime={datetime} className='text-gray-500'>
          {date}
        </time>
        <div className='relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100'>
          {industry.category}
        </div>
      </div>
      <div className='group relative'>
        <p className='mt-5 text-sm leading-6 text-font-primary line-clamp-3'>
          {description}
        </p>
      </div>
      <div className='flex flex-row justify-between items-center w-full pr-4'>
        <div className='relative mt-8 flex items-center gap-x-4'>
          <img
            src={`https://logo.clearbit.com/${company.name}.com`}
            alt=''
            className='h-10 w-10 rounded-full bg-gray-50'
            onError={handleImageError}
          />
          <div className='text-sm leading-6'>
            <p className='font-semibold text-gray-900'>
              <span>
                <span className='absolute inset-0' />
                {company.name}
              </span>
            </p>
            <p className='text-gray-600'>{company.city}</p>
          </div>
        </div>
        <div className='mt-14 flex flex-col items-center justify-center'>
          <button
            onClick={toggleAnswer}
            className='flex items-center  text-link-blue text-sm cursor-pointer'
          >
            {isAnswerOpen ? (
              <ChevronUpIcon className='w-5' />
            ) : (
              <ChevronDownIcon className='w-5' />
            )}
            <span>Answers</span>
          </button>
        </div>
      </div>
      {answers.map((item) => (
        <Answers
          key={item.id}
          isAnswerOpen={isAnswerOpen}
          answer={item.answer}
          userId={item.userId}
        />
      ))}
      <AnswerInput questionId={id} />
    </article>
  )
}

export default CardPreview
