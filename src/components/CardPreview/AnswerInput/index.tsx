import { FC, useState, ChangeEvent, Fragment } from 'react'
import { useUsers } from '../../../context/UserContext'
import { useHttpClient } from '../../../hooks/httpHooks'
import Loader from '../../SharedComponents/Loader'
import ErrorModal from '../../Auth/ErrorModal'
import { useNavigate } from 'react-router-dom'
import { InputType } from '../../../types'
import { useQuestions } from '../../../context/QuestionsContext'
import { SET_RESPONSE } from '../../../context/QuestionsContext/anctions/ActionTypes'
import PrimaryButton from '../../Button/PrimaryButton'
import Textarea from '../../SharedComponents/Textarea'

const AnswerInput: FC<InputType> = ({ questionId }) => {
  const sendButtonLabel = 'Send answer'

  const [message, setMessage] = useState('')
  const { user } = useUsers()
  const { dispatch } = useQuestions()
  const { isLoading, error, sendRequest, setIsOpen, isOpen } = useHttpClient()
  const [textAreaHeight, setTextAreaHeight] = useState('3.5rem')

  const resizeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
    if (event.target.value === '') {
      setTextAreaHeight('3.5rem')
    } else {
      setTextAreaHeight(event.target.scrollHeight + 'px')
    }
  }
  const navigate = useNavigate()
  const handleSend = async () => {
    if (message.length < 2) {
      alert('Description must be at least 2 characters long.')
    } else {
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
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }
  return (
    <Fragment>
      {<ErrorModal isOpen={isOpen} onClose={handleCloseModal} error={error} />}
      {isLoading && <Loader />}
      <div className='flex items-center w-full'>
        <div className='flex-1 mt-4 mx-2 items-center'>
          <Textarea
            placeholder='type your answers here...'
            minLength={2}
            title='answers'
            value={message}
            handleChange={resizeTextArea}
            textAreaHeight={textAreaHeight}
          />
        </div>

        <PrimaryButton
          handleClick={handleSend}
          ariaLabel={sendButtonLabel}
          title='Send'
        />
      </div>
    </Fragment>
  )
}

export default AnswerInput
