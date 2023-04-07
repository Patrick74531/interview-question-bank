import { render, screen } from '@testing-library/react'
import Answers from './index'

const mockAnswer = 'This is a test answer.'

test('Answers renders without crashing', () => {
  render(<Answers answer={mockAnswer} />)
})

test('Answers displays the correct answer text', () => {
  render(<Answers answer={mockAnswer} />)

  const answerElement = screen.getByText(mockAnswer)
  expect(answerElement).toBeInTheDocument()
})
