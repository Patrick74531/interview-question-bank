import { FC } from 'react'
import { InfoformInputType } from '../../../../types'

const InfoformInput: FC<InfoformInputType> = ({
  title,
  value,
  handleChange,
}) => {
  return (
    <div className='mb-4'>
      <label htmlFor='category' className='block text-gray-700 font-bold mb-2'>
        {title}
      </label>
      <input
        required
        id={title}
        name={title}
        type='text'
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        aria-label={title}
      />
    </div>
  )
}

export default InfoformInput
