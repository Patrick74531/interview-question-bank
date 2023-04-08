import { ChangeEvent, useState, FormEvent } from 'react'
import DatePicker from 'react-datepicker'
import { useHttpClient } from '../../../hooks/httpHooks'
import { useUsers } from '../../../context/UserContext'
import Loader from '../../SharedComponents/Loader'
import ErrorModal from '../../Auth/ErrorModal'
import { useQuestions } from '../../../context/QuestionsContext'
import {
  SET_INFO_MODAL_OPEN,
  SET_RESPONSE,
} from '../../../context/QuestionsContext/anctions/ActionTypes'
import InfoformInput from './InfoFormInput'
import PrimaryButton from '../../Button/PrimaryButton'
import InfoFormSelect from './InfoFormSelect'
import Textarea from '../../SharedComponents/Textarea'
import 'react-datepicker/dist/react-datepicker.css'
const InfoForm = () => {
  const optionsData = [
    'Accounting',
    'Administration',
    'Engineering',
    'Education',
    'Government',
    'IT',
    'Others',
  ]
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  const [dateStr, setDateStr] = useState('')
  const [datetime, setDatetime] = useState('')
  const [industry, setIndustry] = useState('')
  const [category, setCategory] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [city, setCity] = useState('')
  const { isLoading, error, sendRequest, setIsOpen, isOpen } = useHttpClient()

  const { user } = useUsers()
  const { dispatch } = useQuestions()

  const handleCloseModal = () => {
    setIsOpen(false)
  }
  const handleCloseInfoModal = () => {
    dispatch({ type: SET_INFO_MODAL_OPEN, payload: false })
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (description.length < 20) {
      alert('Description must be at least 20 characters long.')
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts`,
          'POST',
          JSON.stringify({
            description: description,
            date: dateStr,
            datetime,
            industry: { title: industry.toLowerCase(), category },
            company: {
              name: companyName,
              city,
            },
            creator: user.id,
          }),
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
          }
        )

        dispatch({ type: SET_RESPONSE, payload: responseData })
        handleCloseInfoModal()
      } catch (err) {
        alert(err)
      }
    }
  }
  const handleDate = (e: Date) => {
    setDate(e)
    const dateStr = e.toString()
    const parts = dateStr.split(' ')
    const dates = parts.slice(1, 4).join(' ')
    const datetime = parts[4]

    setDatetime(datetime)
    setDateStr(dates)
  }

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value)

  return (
    <form
      onSubmit={handleSubmit}
      className='w-64 sm:w-128	mx-auto mt-8'
      aria-label='Information Form'
    >
      {isLoading && <Loader />}
      {<ErrorModal isOpen={isOpen} onClose={handleCloseModal} error={error} />}
      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-gray-700 font-bold mb-2'
        >
          Description
        </label>

        <Textarea
          placeholder='type questions here...'
          minLength={20}
          title='description'
          value={description}
          handleChange={handleTextarea}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='date' className='block text-gray-700 font-bold mb-2'>
          Date
        </label>
        <DatePicker
          required
          id='date'
          name='date'
          selected={date}
          onChange={handleDate}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          aria-label='Date'
        />
      </div>
      <InfoFormSelect
        title='Industry'
        handleChange={setIndustry}
        value={industry}
        optionsData={optionsData}
      />
      <InfoformInput
        value={category}
        handleChange={setCategory}
        title='Category'
      />
      <InfoformInput
        value={companyName}
        handleChange={setCompanyName}
        title='Company'
      />
      <InfoformInput value={city} handleChange={setCity} title='City' />

      <div className='flex justify-end'>
        <PrimaryButton ariaLabel='Submit Form' title='Submit' type='submit' />
      </div>
    </form>
  )
}

export default InfoForm
