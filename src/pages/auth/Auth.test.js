import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Auth from './index'

describe('Auth component', () => {
  test('renders Login component', () => {
    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    )
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument()
  })

  test('renders Signup component', () => {
    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    )
    expect(screen.getByText(/Sign up account/i)).toBeInTheDocument()
  })
})
