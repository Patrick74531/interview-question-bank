import { render, screen, fireEvent } from '@testing-library/react'
import SortButton from './index'
import { useQuestions } from '../../../context/QuestionsContext'

jest.mock('../../../context/QuestionsContext', () => ({
  useQuestions: jest.fn(),
}))

describe('SortButton', () => {
  const setIsSortActive = jest.fn()
  const dispatch = jest.fn()
  const postsData = [
    { id: 1, date: '2023-01-02' },
    { id: 2, date: '2023-01-01' },
  ]

  beforeEach(() => {
    useQuestions.mockImplementation(() => ({
      postsData,
      dispatch,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the button with the provided text', () => {
    render(
      <SortButton isSortActive={false} setIsSortActive={setIsSortActive} />
    )
    const button = screen.getByRole('button', { name: 'Sort by date' })
    expect(button).toBeInTheDocument()
  })

  test('calls sortByDate when button is clicked', () => {
    render(
      <SortButton isSortActive={false} setIsSortActive={setIsSortActive} />
    )
    const button = screen.getByRole('button', { name: 'Sort by date' })
    fireEvent.click(button)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_POSTS_DATA',
      payload: [
        { id: 2, date: '2023-01-01' },
        { id: 1, date: '2023-01-02' },
      ],
    })
    expect(setIsSortActive).toHaveBeenCalledTimes(1)
    expect(setIsSortActive).toHaveBeenCalledWith(true)
  })
})
