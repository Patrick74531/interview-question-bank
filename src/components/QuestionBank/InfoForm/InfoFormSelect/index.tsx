import { FC } from 'react'
import { InfoFormSelectType } from '../../../../types'

const InfoFormSelect: FC<InfoFormSelectType> = ({
  title,
  value,
  handleChange,
  optionsData,
}) => {
  return (
    <div className='mb-4'>
      <label htmlFor='industry' className='block text-gray-700 font-bold mb-2'>
        {title}
      </label>
      <select
        required
        id={title}
        name={title}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        aria-label={title}
      >
        <option value=''>Select an industry</option>
        {optionsData.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default InfoFormSelect
