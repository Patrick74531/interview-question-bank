import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SearchResults from './index'

const defaultProps = {
  name: 'example',
  description: 'Example Company',
  id: '1',
  scrollToSearchQuestions: jest.fn(),
}

describe('SearchResults', () => {
  test('should render the component without errors', () => {
    render(<SearchResults {...defaultProps} />)

    expect(screen.getByAltText('example')).toBeInTheDocument()
    expect(screen.getByText('Example Company')).toBeInTheDocument()
  })

  test('should call scrollToSearchQuestions when clicked', () => {
    render(<SearchResults {...defaultProps} />)
    fireEvent.click(screen.getByText('Example Company'))

    expect(defaultProps.scrollToSearchQuestions).toHaveBeenCalledTimes(1)
    expect(defaultProps.scrollToSearchQuestions).toHaveBeenCalledWith('1')
  })
})
