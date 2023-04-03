import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useHttpClient } from '../../hooks/httpHooks'
import { useUsers } from '../../context/UserContext'
import Loader from '../Loader'
import ErrorModal from '../Auth/ErrorModal'
import { useQuestions } from '../../context/QuestionsContext'
import {
  SET_INFO_MODAL_OPEN,
  SET_RESPONSE,
} from '../../context/QuestionsContext/anctions/ActionTypes'

const InfoForm = () => {
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(null)
  const [dateStr, setDateStr] = useState('')
  const [datetime, setDatetime] = useState('')
  const [industry, setIndustry] = useState('')
  const [category, setCategory] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [city, setCity] = useState('')
  const { isLoading, error, sendRequest, setIsOpen, isOpen }: any =
    useHttpClient()

  const { user } = useUsers()
  const { dispatch } = useQuestions()

  const handleCloseModal = () => {
    setIsOpen(false)
  }
  const handleCloseInfoModal = () => {
    dispatch({ type: SET_INFO_MODAL_OPEN, payload: false })
  }
  const handleSubmit = async (e: any) => {
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
  const handleDate = (e: any) => {
    setDate(e)
    const dateStr = e.toString()
    const parts = dateStr.split(' ')
    const dates = parts.slice(1, 4).join(' ')
    const datetime = parts[4]

    setDatetime(datetime)
    setDateStr(dates)
  }

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
        <textarea
          minLength={20}
          id='description'
          name='description'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label='Description'
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
      <div className='mb-4'>
        <label
          htmlFor='industry'
          className='block text-gray-700 font-bold mb-2'
        >
          Industry
        </label>
        <select
          required
          id='industry'
          name='industry'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          aria-label='Industry'
        >
          <option value=''>Select an industry</option>
          <option value='IT'>IT</option>
          <option value='Marketing'>Marketing</option>
        </select>
      </div>
      <div className='mb-4'>
        <label
          htmlFor='category'
          className='block text-gray-700 font-bold mb-2'
        >
          Category
        </label>
        <input
          required
          id='category'
          name='category'
          type='text'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label='Category'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='companyName'
          className='block text-gray-700 font-bold mb-2'
        >
          Company Name
        </label>
        <input
          required
          id='companyName'
          name='companyName'
          type='text'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          aria-label='Company Name'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='city' className='block text-gray-700 font-bold mb-2'>
          city
        </label>
        <input
          required
          id='city'
          name='city'
          type='text'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label='City'
        />
      </div>
      <div className='flex justify-end'>
        <button
          type='submit'
          className='bg-btn-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          aria-label='Submit Form'
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default InfoForm
