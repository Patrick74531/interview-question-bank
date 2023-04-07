import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import QuestionBankHeading from './index'

test('renders question bank heading with correct content and handles button click', () => {
  const scrollToLastViewedQuestion = jest.fn()
  const props = {
    title: 'Sample Title',
    subtitle: 'Sample Subtitle',
    scrollToLastViewedQuestion,
  }

  render(<QuestionBankHeading {...props} />)

  const titleElement = screen.getByText(props.title)
  expect(titleElement).toBeInTheDocument()

  const subtitleElement = screen.getByText(props.subtitle)
  expect(subtitleElement).toBeInTheDocument()

  const buttonElement = screen.getByLabelText(/Scroll to last viewed question/i)
  fireEvent.click(buttonElement)
  expect(scrollToLastViewedQuestion).toHaveBeenCalled()
})
