import { render, screen, fireEvent } from '@testing-library/react'
import InfoformInput from './index'

test('renders InfoformInput with given title and value, and calls handleChange on input change', () => {
  const title = 'Sample Title'
  const value = 'Sample Value'
  const handleChange = jest.fn()

  render(
    <InfoformInput title={title} value={value} handleChange={handleChange} />
  )

  const inputLabel = screen.getByText(title)
  expect(inputLabel).toBeInTheDocument()

  const inputElement = screen.getByLabelText(title)
  expect(inputElement.value).toBe(value)

  // Simulate changing the input value
  fireEvent.change(inputElement, { target: { value: 'New Value' } })

  expect(handleChange).toHaveBeenCalledTimes(1)
})
