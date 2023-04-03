import { FC, useState, ChangeEvent } from 'react'
import { useUsers } from '../../context/UserContext'
import { useHttpClient } from '../../hooks/httpHooks'
import Loader from '../Loader'
import ErrorModal from '../Auth/ErrorModal'
import { useNavigate } from 'react-router-dom'
import { InputType } from '../../types'
import { useQuestions } from '../../context/QuestionsContext'
import { SET_RESPONSE } from '../../context/QuestionsContext/anctions/ActionTypes'

const AnswerInput: FC<InputType> = ({ questionId }) => {
  const sendButtonLabel = 'Send answer'

  const [message, setMessage] = useState('')
  const { user } = useUsers()
  const { dispatch } = useQuestions()
  const { isLoading, error, sendRequest, setIsOpen, isOpen }: any =
    useHttpClient()
  const [textAreaHeight, setTextAreaHeight] = useState('3rem')

  const resizeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
    if (event.target.value === '') {
      setTextAreaHeight('3rem')
    } else {
      setTextAreaHeight(event.target.scrollHeight + 'px')
    }
  }
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

        dispatch({ type: SET_RESPONSE, payload: responseData })
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
      <div className='flex-1 px-4 py-8'>
        <textarea
          className='custom-scrollbar w-full h-full resize-none border rounded-md   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder='Type your answer here...'
          value={message}
          onChange={resizeTextArea}
          style={{ height: textAreaHeight, maxHeight: '8rem' }}
        />
      </div>
      <button
        className='bg-btn-primary  hover:bg-purple-700 text-white h-10 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        onClick={handleSend}
        aria-label={sendButtonLabel}
      >
        Send
      </button>
    </div>
  )
}

export default AnswerInput
