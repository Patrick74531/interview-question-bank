import { render, screen, fireEvent } from '@testing-library/react'
import ErrorModal from './index'

const mockIsOpen = true
const mockOnClose = jest.fn()
const mockError = 'An error occurred'

test('ErrorModal renders when isOpen is true', () => {
  render(
    <ErrorModal isOpen={mockIsOpen} onClose={mockOnClose} error={mockError} />
  )

  const errorElement = screen.getByText(mockError)
  expect(errorElement).toBeInTheDocument()
})

test('ErrorModal does not render when isOpen is false', () => {
  render(
    <ErrorModal isOpen={!mockIsOpen} onClose={mockOnClose} error={mockError} />
  )

  const errorElement = screen.queryByText(mockError)
  expect(errorElement).not.toBeInTheDocument()
})

test('ErrorModal calls onClose when background is clicked', () => {
  render(
    <ErrorModal isOpen={mockIsOpen} onClose={mockOnClose} error={mockError} />
  )

  const backgroundElement = screen.getByTestId('background')
  fireEvent.click(backgroundElement)

  expect(mockOnClose).toHaveBeenCalled()
})
