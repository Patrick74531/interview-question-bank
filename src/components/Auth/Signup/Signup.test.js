import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Signup from './index'
import { BrowserRouter } from 'react-router-dom'

const mockNavigate = jest.fn()
const mockLogin = jest.fn()

jest.mock('../../../hooks/httpHooks', () => ({
  useHttpClient: () => ({
    isLoading: false,
    error: null,
    sendRequest: jest.fn().mockResolvedValue({
      email: 'john@example.com',
      name: 'John Doe',
      token: 'fake_token',
      userId: 'fake_user_id',
    }),
    setIsOpen: jest.fn(),
    isOpen: false,
  }),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

jest.mock('../../../context/UserContext', () => ({
  useUsers: () => ({
    login: mockLogin,
  }),
}))

test('renders the Signup component (unit test)', () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  )

  const nameInput = screen.getByPlaceholderText('input name')
  const emailInput = screen.getByPlaceholderText('Email address')
  const passwordInput = screen.getByPlaceholderText('password')
  const signUpButton = screen.getByText('Sign up')

  expect(nameInput).toBeInTheDocument()
  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(signUpButton).toBeInTheDocument()

  userEvent.type(nameInput, 'John Doe')
  userEvent.type(emailInput, 'john@example.com')
  userEvent.type(passwordInput, 'password123')

  expect(nameInput).toHaveValue('John Doe')
  expect(emailInput).toHaveValue('john@example.com')
  expect(passwordInput).toHaveValue('password123')
  userEvent.click(signUpButton)
})

test('Signup component integration test', async () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  )

  const nameInput = screen.getByPlaceholderText('input name')
  const emailInput = screen.getByPlaceholderText('Email address')
  const passwordInput = screen.getByPlaceholderText('password')
  const signUpButton = screen.getByText('Sign up')

  userEvent.type(nameInput, { target: { value: 'John Doe' } })
  userEvent.type(emailInput, { target: { value: 'john@example.com' } })
  userEvent.type(passwordInput, { target: { value: 'password123' } })

  userEvent.click(signUpButton)

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalled()
  })

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
