import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Login from './index'

const mockLogin = jest.fn()
const mockNavigate = jest.fn()

jest.mock('../../../hooks/httpHooks', () => ({
  useHttpClient: () => ({
    isLoading: false,
    error: null,
    sendRequest: jest.fn().mockResolvedValue({
      email: 'test@example.com',
      userId: '1',
      name: 'John Doe',
      token: 'fake_token',
    }),
    setIsOpen: jest.fn(),
    isOpen: false,
  }),
}))

jest.mock('../../../context/UserContext', () => ({
  useUsers: () => ({
    login: mockLogin,
  }),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

test('Login component integration test', async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )

  const emailInput = screen.getByPlaceholderText('Email address')
  const passwordInput = screen.getByPlaceholderText('password')
  const signInButton = screen.getByLabelText('Sign in to your account')

  userEvent.type(emailInput, 'test@example.com')
  userEvent.type(passwordInput, 'password') 
  userEvent.click(signInButton)

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalled()
  })
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
