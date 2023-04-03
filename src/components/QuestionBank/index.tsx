import { useState, useEffect, FC, useRef, useCallback } from 'react'
import CardPreview from '../CardPreview'
import InfoModal from '../InfoModal'
import { useHttpClient } from '../../hooks/httpHooks'
import Loader from '../Loader'
import ErrorModal from '../Auth/ErrorModal'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../../context/UserContext'
import { IndustryType } from '../../types'
import SortButton from '../SortButton'
import BackToTopButton from '../BackToTopButton'
import CustomSnackBar from '../CustomSnackBar'
import { SnackbarOrigin } from '@mui/material/Snackbar'
import InfoForm from '../InfoForm'
import { useQuestions } from '../../context/QuestionsContext'
import {
  SET_INFO_MODAL_OPEN,
  SET_POSTS_DATA,
  SET_SNACKBAR_STATE,
} from '../../context/QuestionsContext/anctions/ActionTypes'
const QuestionBank: FC<IndustryType> = ({ industry }) => {
  const scrollToLastViewedQuestionLabel = 'Scroll to last viewed question'
  const shareMyInterviewQuestionLabel = 'Share my interview question'

  const { response, postsData, isInfoModalOpen, dispatch } = useQuestions()

  const { isLoading, error, sendRequest, setIsOpen }: any = useHttpClient()
  const navigate = useNavigate()
  const { user } = useUsers()
  const [isSortActive, setIsSortActive] = useState(false)
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [bookmarkedId, setBookmarkedId] = useState<string | null>(null)

  const handleBookmarkClick = useCallback(
    (newState: SnackbarOrigin) => () => {
      dispatch({
        type: SET_SNACKBAR_STATE,
        payload: { open: true, ...newState },
      })
      setTimeout(
        () =>
          dispatch({
            type: SET_SNACKBAR_STATE,
            payload: { open: false, ...newState },
          }),
        2000
      )
    },
    [dispatch]
  )

  const scrollToLastViewedQuestion = useCallback(() => {
    const lastViewedQuestion = localStorage.getItem('lastViewedQuestion')
    if (lastViewedQuestion) {
      const { id } = JSON.parse(lastViewedQuestion)
      const element = cardRefs.current[id]
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      handleBookmarkClick({
        vertical: 'top',
        horizontal: 'center',
      })()
    }
  }, [handleBookmarkClick])

  useEffect(() => {
    const fecthData = async () => {
      try {
        const postsDatabase = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${industry}`
        )

        dispatch({ type: SET_POSTS_DATA, payload: postsDatabase.post })
      } catch (err) {}
    }

    fecthData()
  }, [sendRequest, response, industry, scrollToLastViewedQuestion, dispatch])

  const handleOpenModal = () => {
    if (!user.token) {
      navigate('/auth')
    } else {
      dispatch({ type: SET_INFO_MODAL_OPEN, payload: true })
    }
  }

  const handleCloseErrorModal = () => {
    setIsOpen(false)
  }

  const handleCloseInfoModal = () =>
    dispatch({ type: SET_INFO_MODAL_OPEN, payload: false })

  return (
    <div className='bg-white py-24 sm:py-32'>
      {
        <ErrorModal
          isOpen={isInfoModalOpen}
          onClose={handleCloseErrorModal}
          error={error}
        />
      }
      {isLoading && <Loader />}
      <div className='mx-auto max-w-4xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl lg:mx-0 w-full'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Interview Question Bank
            </h1>
            <div className='w-full flex justify-between items-center'>
              <p className='mt-2 text-lg leading-8 text-gray-600'>
                Learn and share interview's question
              </p>
              <button
                className=' bg-btn-primary  hover:bg-purple-700 text-white py-1 px-1 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2'
                aria-label={scrollToLastViewedQuestionLabel}
                onClick={scrollToLastViewedQuestion}
              >
                {' '}
                Bookmark
              </button>
            </div>
          </div>
          <CustomSnackBar message='Please add a bookmark first' />
          <div className='flex justify-between items-center'>
            <button
              onClick={handleOpenModal}
              className='bg-btn-primary  hover:bg-purple-700 text-white h-10 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-3'
              aria-label={shareMyInterviewQuestionLabel}
            >
              share my interview question
            </button>

            <div className='flex items-center justify-center pt-3'>
              <label className='px-2'>Sort:</label>
              <SortButton
                isSortActive={isSortActive}
                setIsSortActive={setIsSortActive}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-10 mx-auto mt-3  max-w-4xl border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16'>
          {postsData &&
            postsData.map(
              ({
                id,
                description,
                date,
                datetime,
                industry,
                company,
                answers,
              }) => (
                <CardPreview
                  key={id}
                  ref={(el) => (cardRefs.current[id] = el)}
                  id={id}
                  description={description}
                  date={date}
                  datetime={datetime}
                  industry={industry}
                  company={company}
                  answers={answers}
                  isBookmarked={bookmarkedId === id}
                  setBookmarkedId={setBookmarkedId}
                />
              )
            )}
        </div>
      </div>
      <BackToTopButton />
      <InfoModal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal}>
        <InfoForm />
      </InfoModal>
    </div>
  )
}

export default QuestionBank
