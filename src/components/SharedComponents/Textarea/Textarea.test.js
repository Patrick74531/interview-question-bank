import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Textarea from './index'

test('renders textarea with correct attributes and handles onChange event', () => {
  const handleChange = jest.fn()
  const props = {
    placeholder: 'Sample placeholder',
    minLength: 10,
    title: 'Sample title',
    value: '',
    handleChange,
    textAreaHeight: '6rem',
  }

  render(<Textarea {...props} />)

  const textarea = screen.getByLabelText(props.title)
  expect(textarea).toBeInTheDocument()
  expect(textarea).toHaveAttribute('placeholder', props.placeholder)
  expect(textarea).toHaveAttribute('minLength', props.minLength.toString())
  expect(textarea).toHaveStyle({ height: props.textAreaHeight })

  fireEvent.change(textarea, { target: { value: 'Sample text' } })
  expect(handleChange).toHaveBeenCalled()
})
