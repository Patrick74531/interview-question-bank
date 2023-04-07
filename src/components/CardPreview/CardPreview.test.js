// Import necessary libraries and the component
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CardPreview from './index'

const mockNavigate = jest.fn()
// Mock the dependencies
jest.mock('../../hooks/httpHooks', () => ({
  useHttpClient: () => ({
    isLoading: false,
    error: null,
    sendRequest: jest.fn(),
    setIsOpen: jest.fn(),
    isOpen: false,
  }),
}))

jest.mock('../../context/QuestionsContext', () => ({
  useQuestions: () => ({
    dispatch: jest.fn(),
  }),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

// Define the initial state for the component
const initialProps = {
  company: {
    name: 'Company Name',
    city: 'Company City',
    intro: 'Company Intro',
  },
  industry: {
    category: 'Industry Category',
  },
  answers: [
    {
      id: 'answer-1',
      answer: 'Answer 1',
    },
    {
      id: 'answer-2',
      answer: 'Answer 2',
    },
  ],
  id: 'question-id',
  setBookmarkedId: jest.fn(),
}
// Write the integration test
test('CardPreview component integration test', async () => {
  render(<CardPreview {...initialProps} />)

  // Check if the company name and city are rendered
  expect(screen.getByText(initialProps.company.name)).toBeInTheDocument()
  expect(screen.getByText(initialProps.company.city)).toBeInTheDocument()

  // Check if the answers are rendered
  initialProps.answers.forEach((answer) => {
    expect(screen.getByText(answer.answer)).toBeInTheDocument()
  })
})

test('displays a new answer in Answers after submitting in AnswerInput', async () => {
  render(<CardPreview {...initialProps} />)

  // Find the AnswerInput textarea and the submit button
  const answerInput = screen.getByPlaceholderText(/type your answers here.../i)
  const submitButton = screen.getByLabelText(/Send answer/i)

  // Type a new answer into the AnswerInput textarea
  userEvent.type(answerInput, 'New answer')

  // Click the submit button
  userEvent.click(submitButton)

  // Wait for the new answer to appear in the Answers component
  await waitFor(() => {
    expect(screen.getByText('New answer')).toBeInTheDocument()
  })
})

test('shows CompanyIntro modal when clicking on CardPreviewCompany', async () => {
  render(<CardPreview {...initialProps} />)

  // Find the CardPreviewCompany element
  const cardPreviewCompany = screen.getByTestId('card-preview-company')

  // Click on the CardPreviewCompany element
  userEvent.click(cardPreviewCompany)

  // Wait for the CompanyIntro modal to appear
  await waitFor(() => {
    expect(screen.getByText('Company Intro')).toBeInTheDocument()
  })
})
