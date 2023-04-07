import { render, screen, fireEvent } from '@testing-library/react'
import InfoModal from './index'

test('renders the modal when isOpen is true', () => {
  const isOpen = true
  const onClose = jest.fn()

  render(
    <InfoModal isOpen={isOpen} onClose={onClose}>
      <p>Modal content</p>
    </InfoModal>
  )

  const modalContent = screen.getByTestId('modal-content')
  expect(modalContent).toBeInTheDocument()
})

test('does not render the modal when isOpen is false', () => {
  const isOpen = false
  const onClose = jest.fn()

  render(
    <InfoModal isOpen={isOpen} onClose={onClose}>
      <p>Modal content</p>
    </InfoModal>
  )

  const modalContent = screen.queryByTestId('modal-content')
  expect(modalContent).not.toBeInTheDocument()
})

test('calls onClose when clicking on the background', () => {
  const isOpen = true
  const onClose = jest.fn()

  render(
    <InfoModal isOpen={isOpen} onClose={onClose}>
      <p>Modal content</p>
    </InfoModal>
  )

  const background = screen.getByLabelText('Close modal')
  fireEvent.click(background)
  expect(onClose).toHaveBeenCalled()
})
