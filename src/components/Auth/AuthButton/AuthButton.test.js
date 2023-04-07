import { render, screen } from '@testing-library/react'
import AuthButton from './index'

const mockButtonName = 'Sign In'

test('AuthButton renders without crashing', () => {
  render(<AuthButton name={mockButtonName} />)

  const buttonElement = screen.getByRole('button', {
    name: /Sign in to your account/i,
  })
  expect(buttonElement).toBeInTheDocument()

  const lockIconElement = screen.getByTestId('lock-icon')
  expect(lockIconElement).toBeInTheDocument()
})

test('AuthButton contains the correct aria-label', () => {
  render(<AuthButton name={mockButtonName} />)

  const buttonElement = screen.getByRole('button', {
    name: /Sign in to your account/i,
  })
  expect(buttonElement).toHaveAttribute('aria-label', 'Sign in to your account')
})
