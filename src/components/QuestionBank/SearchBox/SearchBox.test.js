import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SearchBox from './index'

const mockScrollToSearchQuestions = jest.fn()

const mockPostsData = [
  {
    id: '1',
    company: {
      name: 'example',
    },
    description: 'Example Company',
  },
  {
    id: '2',
    company: {
      name: 'another',
    },
    description: 'Another Company',
  },
]

jest.mock('../../../context/QuestionsContext', () => ({
  useQuestions: () => ({
    postsData: mockPostsData,
  }),
}))

describe('SearchBox', () => {
  test('renders the component without errors', () => {
    render(<SearchBox scrollToSearchQuestions={mockScrollToSearchQuestions} />)
    expect(
      screen.getByPlaceholderText('search questions or companies')
    ).toBeInTheDocument()
  })

  test('displays filtered posts when search text is entered', async () => {
    render(<SearchBox scrollToSearchQuestions={mockScrollToSearchQuestions} />)

    fireEvent.change(
      screen.getByPlaceholderText('search questions or companies'),
      {
        target: { value: 'example' },
      }
    )

    expect(await screen.findByText('Example Company')).toBeInTheDocument()
    expect(screen.queryByText('Another Company')).not.toBeInTheDocument()
  })

  test('calls scrollToSearchQuestions when search result is clicked', async () => {
    render(<SearchBox scrollToSearchQuestions={mockScrollToSearchQuestions} />)

    fireEvent.change(
      screen.getByPlaceholderText('search questions or companies'),
      {
        target: { value: 'example' },
      }
    )

    fireEvent.click(await screen.findByText('Example Company'))
    expect(mockScrollToSearchQuestions).toHaveBeenCalledWith('1')
  })
})
