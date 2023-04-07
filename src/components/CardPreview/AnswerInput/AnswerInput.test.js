import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AnswerInput from './index'

jest.mock('../../../context/QuestionsContext', () => ({
  useQuestions: () => ({
    dispatch: jest.fn(),
  }),
}))

jest.mock('../../../context/UserContext', () => ({
  useUsers: () => ({
    user: {
      token: 'test-token',
    },
  }),
}))

jest.mock('../../../hooks/httpHooks', () => ({
  useHttpClient: () => ({
    isLoading: false,
    error: null,
    sendRequest: jest.fn(),
    setIsOpen: jest.fn(),
    isOpen: false,
  }),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

const mockQuestionId = '12345'

test('AnswerInput renders without crashing', () => {
  render(<AnswerInput questionId={mockQuestionId} />)
})

test('AnswerInput textarea and button interaction', async () => {
  render(<AnswerInput questionId={mockQuestionId} />)

  const textareaElement = screen.getByRole('textbox', { name: /answers/i })
  fireEvent.change(textareaElement, { target: { value: 'Test answer' } })
  expect(textareaElement).toHaveValue('Test answer')

  const buttonElement = screen.getByRole('button', { name: /Send/i })
  fireEvent.click(buttonElement)

  await waitFor(() => expect(textareaElement).toHaveValue(''))
})
