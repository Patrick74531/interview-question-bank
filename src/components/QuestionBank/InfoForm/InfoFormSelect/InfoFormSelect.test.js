import { render, screen, fireEvent } from '@testing-library/react'
import InfoFormSelect from './index'

test('renders InfoFormSelect with title, options and calls handleChange on option selection', () => {
  const title = 'Sample Title'
  const value = ''
  const handleChange = jest.fn()
  const optionsData = ['Option 1', 'Option 2', 'Option 3']

  render(
    <InfoFormSelect
      title={title}
      value={value}
      handleChange={handleChange}
      optionsData={optionsData}
    />
  )

  const titleElement = screen.getByText(title)
  expect(titleElement).toBeInTheDocument()

  const selectElement = screen.getByLabelText(title)
  fireEvent.change(selectElement, { target: { value: optionsData[1] } })
  expect(handleChange).toHaveBeenCalledWith(optionsData[1])

  optionsData.forEach((optionText) => {
    const optionElement = screen.getByText(optionText)
    expect(optionElement).toBeInTheDocument()
  })
})
