import { render, screen, fireEvent } from '@testing-library/react'
import AuthInput from './index'

const mockName = 'Email'
const mockType = 'email'
const mockPlaceholder = 'Your Email'
const mockInputHandler = jest.fn()

test('AuthInput renders without crashing', () => {
  render(
    <AuthInput
      name={mockName}
      type={mockType}
      placeholder={mockPlaceholder}
      inputHandler={mockInputHandler}
    />
  )

  const inputElement = screen.getByPlaceholderText(mockPlaceholder)
  expect(inputElement).toBeInTheDocument()
})

test('AuthInput has the correct input type', () => {
  render(
    <AuthInput
      name={mockName}
      type={mockType}
      placeholder={mockPlaceholder}
      inputHandler={mockInputHandler}
    />
  )

  const inputElement = screen.getByPlaceholderText(mockPlaceholder)
  expect(inputElement).toHaveAttribute('type', mockType)
})

test('AuthInput handles input changes correctly', () => {
  render(
    <AuthInput
      name={mockName}
      type={mockType}
      placeholder={mockPlaceholder}
      inputHandler={mockInputHandler}
    />
  )

  const inputElement = screen.getByPlaceholderText(mockPlaceholder)
  fireEvent.change(inputElement, { target: { value: 'test@example.com' } })

  expect(mockInputHandler).toHaveBeenCalled()
})
