import { FC } from 'react'
import { TextareaType } from '../../../types'

const Textarea: FC<TextareaType> = ({
  placeholder,
  minLength,
  title,
  value,
  handleChange,
  textAreaHeight,
}) => {
  return (
    <textarea
      className='custom-scrollbar w-full h-full resize-none border rounded-md   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      placeholder={placeholder}
      minLength={minLength}
      value={value}
      onChange={handleChange}
      style={{ height: textAreaHeight, maxHeight: '8rem' }}
      aria-label={title}
    />
  )
}

export default Textarea
