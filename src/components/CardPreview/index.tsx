import { Ref, forwardRef, useEffect, MouseEvent, useCallback } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Answers from '../Answers'
import AnswerInput from '../AnswerInput'
import { PostsType } from '../../types'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { SvgIcon } from '@mui/material'
import InfoModal from '../InfoModal'
import { useHttpClient } from '../../hooks/httpHooks'
import Loader from '../Loader'
import ErrorModal from '../Auth/ErrorModal'
import { useQuestions } from '../../context/QuestionsContext'
import CompanyIntro from '../companyIntro'
import { SET_RESPONSE } from '../../context/QuestionsContext/anctions/ActionTypes'

const CardPreview = forwardRef<
  HTMLDivElement,
  PostsType & {
    isBookmarked: boolean
    setBookmarkedId: (id: string | null) => void
  }
>((props, ref) => {
  const {
    description,
    date,
    datetime,
    industry,
    company,
    answers,
    id,
    isBookmarked,
    setBookmarkedId,
  } = props

  const [isAnswerOpen, setIsAnswerOpen] = useState(false)
  const [visibleAnswers, setVisibleAnswers] = useState(5)

  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)
  const { dispatch } = useQuestions()
  const { isLoading, error, sendRequest, setIsOpen, isOpen }: any =
    useHttpClient()

  const toggleAnswer = () => setIsAnswerOpen(!isAnswerOpen)

  const handleImageError = useCallback((event: any) => {
    event.target.onerror = null
    event.target.src = 'no-image.png'
  }, [])

  // Add aria-labels for the buttons
  const toggleAnswerLabel = isAnswerOpen ? 'Collapse answers' : 'Expand answers'

  const handleBookmark = () => {
    setBookmarkedId(id)

    localStorage.setItem('lastViewedQuestion', JSON.stringify(props))
  }

  const fetchCompanyIntro = async () => {
    if (!company.intro) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/company/${id}`,
          'PATCH',
          JSON.stringify({
            city: company.city,
            name: company.name,
          }),
          {
            'Content-Type': 'application/json',
          }
        )
        dispatch({ type: SET_RESPONSE, payload: responseData })
      } catch (err) {
        alert(err)
      }
    }
  }

  const handleCompanyIntro = async (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    if (!company.intro) {
      await fetchCompanyIntro()
    }

    setIsCompanyModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleCloseInfoModal = () => setIsCompanyModalOpen(false)

  useEffect(() => {
    const lastViewedQuestion = localStorage.getItem('lastViewedQuestion')
    if (lastViewedQuestion) {
      const { id } = JSON.parse(lastViewedQuestion)
      setBookmarkedId(id)
    }
  }, [setBookmarkedId])

  useEffect(() => {
    if (isAnswerOpen) {
      setVisibleAnswers(answers.length)
    } else {
      setVisibleAnswers(5)
    }
  }, [answers.length, isAnswerOpen])

  return (
    <article
      className='flex max-w-3xl flex-col items-start justify-between w-full relative'
      ref={ref as Ref<HTMLDivElement>}
    >
      {company.intro && (
        <InfoModal isOpen={isCompanyModalOpen} onClose={handleCloseInfoModal}>
          <CompanyIntro companyIntro={company.intro} />
        </InfoModal>
      )}
      {<ErrorModal isOpen={isOpen} onClose={handleCloseModal} error={error} />}
      {isLoading && <Loader />}
      <div className='relative flex items-center gap-x-4 text-xs w-full'>
        <time dateTime={datetime} className='text-gray-500'>
          {date}
        </time>
        <div className='relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100'>
          {industry.category}
        </div>
        <button
          onClick={handleBookmark}
          className='absolute right-0'
          aria-label='Add a bookmark'
        >
          <SvgIcon
            sx={{
              color: isBookmarked ? 'lightblue' : 'grey',
              cursor: 'pointer',
              fontSize: '40px',
            }}
          >
            <BookmarkIcon />
          </SvgIcon>
        </button>
      </div>
      <div className='group w-full'>
        <p className='mt-5 text-sm leading-6 text-font-primary line-clamp-3 w-full'>
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
          <div className='text-sm leading-6 cursor-pointer'>
            <p
              onClick={(event) => handleCompanyIntro(event)}
              className='font-semibold text-link-blue'
            >
              {company.name}
            </p>

            <p className='text-gray-600'>{company.city}</p>
          </div>
        </div>
      </div>
      {answers.slice(0, visibleAnswers).map((item) => (
        <Answers key={item.id} answer={item.answer} />
      ))}
      {answers.length > 5 && (
        <div className='mt-5 flex flex-col items-center justify-center'>
          <button
            onClick={toggleAnswer}
            className='flex items-center  text-link-blue text-sm cursor-pointer'
            aria-label={toggleAnswerLabel}
          >
            {isAnswerOpen ? (
              <ChevronUpIcon className='w-5' />
            ) : (
              <ChevronDownIcon className='w-5' />
            )}
            <span>More</span>
          </button>
        </div>
      )}

      <AnswerInput questionId={id} />
    </article>
  )
})

export default CardPreview
