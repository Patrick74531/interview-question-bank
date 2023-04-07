import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './index'

const mockLogout = jest.fn()

const userMock = { token: null }

jest.mock('../../context/UserContext', () => ({
  useUsers: () => ({
    user: userMock,
    logout: mockLogout,
  }),
}))

const renderNavigation = (user = { token: null }) => {
  Object.assign(userMock, user)

  render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  )
}

describe('Navigation component', () => {
  test('renders company logo', () => {
    renderNavigation()
    const companyLogo = screen.getByTestId('navigation')
    expect(companyLogo).toBeInTheDocument()
  })

  test('renders navigation links', () => {
    renderNavigation()
    const questionBankLink = screen.getByText(/QuestionBank/i)
    const itLink = screen.getByText(/IT/i)
    const marketingLink = screen.getByText(/Marketing/i)

    expect(questionBankLink).toBeInTheDocument()
    expect(itLink).toBeInTheDocument()
    expect(marketingLink).toBeInTheDocument()
  })

  test('renders user menu with Sign in when user is not logged in', () => {
    renderNavigation()
    const userMenuButton = screen.getByText(/Open user menu/i)
    fireEvent.click(userMenuButton)

    const signInOption = screen.getByText(/Sign in/i)
    expect(signInOption).toBeInTheDocument()
  })

  test('renders user menu with Sign out when user is logged in', () => {
    renderNavigation({ token: 'mockToken' })
    const userMenuButton = screen.getByText(/Open user menu/i)
    fireEvent.click(userMenuButton)

    const signOutOption = screen.getByText(/Sign out/i)
    expect(signOutOption).toBeInTheDocument()
  })

  test('renders notifications button', () => {
    renderNavigation()
    const notificationsButton = screen.getByText(/View notifications/i)
    expect(notificationsButton).toBeInTheDocument()
  })
})
