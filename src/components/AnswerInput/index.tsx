import { FC, useState } from 'react'
import { useUsers } from '../../context/UserContext'
import { useHttpClient } from '../../hooks/httpHooks'
import { usePosts } from '../../context/PostsContext'
import Loader from '../Loader'
import ErrorModal from '../Auth/ErrorModal'
import { useNavigate } from 'react-router-dom'
type InputType = {
  questionId: string | undefined
}

const AnswerInput: FC<InputType> = ({ questionId }) => {
  const [message, setMessage] = useState('')
  const { user } = useUsers()
  const { setResponse } = usePosts()
  const { isLoading, error, sendRequest, setIsOpen, isOpen }: any =
    useHttpClient()
  const navigate = useNavigate()
  const handleSend = async () => {
    if (!user.token) {
      navigate('/auth')
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${questionId}`,
          'PATCH',
          JSON.stringify({
            userId: user.id,
            answer: message,
          }),
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
          }
        )

        setResponse(responseData)
      } catch (err) {
        alert(err)
      }

      setMessage('')
    }
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }
  return (
    <div className='flex items-center flex-row w-full'>
      {<ErrorModal isOpen={isOpen} onClose={handleCloseModal} error={error} />}
      {isLoading && <Loader />}
      <div className='flex-1 bg-gray-50 px-4 py-8'>
        <textarea
          className='w-full h-full resize-none border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder='Type your answer here...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        className='bg-btn-primary text-white h-10 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  )
}

export default AnswerInput
