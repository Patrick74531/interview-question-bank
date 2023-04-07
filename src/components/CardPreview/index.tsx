import {
  Ref,
  forwardRef,
  useEffect,
  MouseEvent,
  useCallback,
  useState,
  SyntheticEvent,
} from 'react'
import Answers from './Answers'
import AnswerInput from './AnswerInput'
import { PostsType } from '../../types'
import InfoModal from '../SharedComponents/InfoModal'
import { useHttpClient } from '../../hooks/httpHooks'
import Loader from '../SharedComponents/Loader'
import ErrorModal from '../Auth/ErrorModal'
import { useQuestions } from '../../context/QuestionsContext'
import CompanyIntro from './CompanyIntro'
import { SET_RESPONSE } from '../../context/QuestionsContext/anctions/ActionTypes'
import CardPreviewCompany from './CardPreviewCompany'
import CardPreviewQuestion from './CardPreviewQuestion'
import ChevronButton from '../Button/ChevronButton'

const CardPreview = forwardRef<
  HTMLDivElement,
  PostsType & {
    isBookmarked: boolean
    setBookmarkedId: (id: string | null) => void
  }
>((props, ref) => {
  const { company, answers, id, setBookmarkedId } = props

  const { name, city, intro } = company
  const [isAnswerOpen, setIsAnswerOpen] = useState(false)
  const [visibleAnswers, setVisibleAnswers] = useState(5)

  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)
  const { dispatch } = useQuestions()
  const { isLoading, error, sendRequest, setIsOpen, isOpen } = useHttpClient()

  const toggleAnswer = () => setIsAnswerOpen(!isAnswerOpen)

  const handleImageError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      event.currentTarget.onerror = null
      event.currentTarget.src = 'no-image.png'
    },
    []
  )

  // Add aria-labels for the buttons
  const toggleAnswerLabel = isAnswerOpen ? 'Collapse answers' : 'Expand answers'

  const fetchCompanyIntro = async () => {
    if (!intro) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/company/${id}`,
          'PATCH',
          JSON.stringify({
            city,
            name,
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
    if (!intro) {
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
    } else {
      setBookmarkedId(null)
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
      data-testid='posts'
    >
      {intro && (
        <InfoModal isOpen={isCompanyModalOpen} onClose={handleCloseInfoModal}>
          <CompanyIntro companyIntro={intro} />
        </InfoModal>
      )}
      {<ErrorModal isOpen={isOpen} onClose={handleCloseModal} error={error} />}
      {isLoading && <Loader />}

      <CardPreviewQuestion props={props} />

      <CardPreviewCompany
        handleImageError={handleImageError}
        handleCompanyIntro={handleCompanyIntro}
        company={company}
      />

      {answers.slice(0, visibleAnswers).map((item) => (
        <Answers key={item.id} answer={item.answer} />
      ))}
      {answers.length > 5 && (
        <ChevronButton
          isOpen={isAnswerOpen}
          handleClick={toggleAnswer}
          toggleButtonLabel={toggleAnswerLabel}
        />
      )}

      <AnswerInput questionId={id} />
    </article>
  )
})

export default CardPreview
