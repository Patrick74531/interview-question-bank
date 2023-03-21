import { useState, useEffect, FC } from 'react'
import CardPreview from '../CardPreview'
import { usePosts } from '../../context/PostsContext'
import InfoModal from '../InfoModal'
import { useHttpClient } from '../../hooks/httpHooks'
import Loader from '../Loader'
import ErrorModal from '../Auth/ErrorModal'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../../context/UserContext'

type IndustryType = {
  industry: string
}

const QuestionBank: FC<IndustryType> = ({ industry }) => {
  const { response } = usePosts()
  const [isOpen, setIsOpen] = useState(false)
  const [postsData, setPostsData] = useState([])
  const { isLoading, error, sendRequest }: any = useHttpClient()
  const navigate = useNavigate()
  const { user } = useUsers()

  useEffect(() => {
    const fecthData = async () => {
      try {
        const postsDatabase = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${industry}`
        )

        setPostsData(postsDatabase.post)
      } catch (err) {}
    }

    fecthData()
  }, [sendRequest, response, industry])

  const handleOpenModal = () => {
    if (!user.token) {
      navigate('/auth')
    } else {
      setIsOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }
  return (
    <div className='bg-white py-24 sm:py-32'>
      {<ErrorModal isOpen={isOpen} onClose={handleCloseModal} error={error} />}
      {isLoading && <Loader />}
      <div className='mx-auto max-w-4xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Interview Question Bank
            </h2>
            <p className='mt-2 text-lg leading-8 text-gray-600'>
              Learn and share interview's question
            </p>
          </div>
          <button
            onClick={handleOpenModal}
            className='bg-btn-primary text-white h-10 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-3'
          >
            share my interview question
          </button>
        </div>
        <div className='flex flex-col justify-center items-center gap-10 mx-auto mt-6  max-w-4xl border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16'>
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
                  id={id}
                  description={description}
                  date={date}
                  datetime={datetime}
                  industry={industry}
                  company={company}
                  answers={answers}
                />
              )
            )}
        </div>
      </div>
      <InfoModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default QuestionBank
