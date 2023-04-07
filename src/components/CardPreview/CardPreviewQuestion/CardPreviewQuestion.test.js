import { render, screen, fireEvent } from '@testing-library/react'
import CardPreviewQuestion from './index'

const mockProps = {
  setBookmarkedId: jest.fn(),
  isBookmarked: false,
  id: 1,
  description: 'Test question',
  datetime: '2022-01-01T12:00:00.000Z',
  date: '2022-01-01',
  industry: {
    category: 'Test Category',
  },
}

test('CardPreviewQuestion renders without crashing', () => {
  render(<CardPreviewQuestion props={mockProps} />)

  const dateElement = screen.getByText(mockProps.date)
  expect(dateElement).toBeInTheDocument()

  const categoryElement = screen.getByText(mockProps.industry.category)
  expect(categoryElement).toBeInTheDocument()

  const descriptionElement = screen.getByText(mockProps.description)
  expect(descriptionElement).toBeInTheDocument()

  const svgButtonElement = screen.getByLabelText('Add a bookmark')
  expect(svgButtonElement).toBeInTheDocument()
})

test('CardPreviewQuestion handleBookmark function is called on button click', () => {
  render(<CardPreviewQuestion props={mockProps} />)

  const svgButtonElement = screen.getByLabelText('Add a bookmark')
  fireEvent.click(svgButtonElement)

  expect(mockProps.setBookmarkedId).toHaveBeenCalledTimes(1)
  expect(mockProps.setBookmarkedId).toHaveBeenCalledWith(mockProps.id)
})
