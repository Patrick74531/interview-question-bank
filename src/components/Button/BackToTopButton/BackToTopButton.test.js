import { render, screen, fireEvent } from '@testing-library/react'
import BackToTopButton from './index'

// Mock the window.scrollTo function
global.window.scrollTo = jest.fn()

describe('BackToTopButton', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders nothing when not scrolled', () => {
    render(<BackToTopButton />)
    const button = screen.queryByText('Back to Top')
    expect(button).not.toBeInTheDocument()
  })

  test('renders button when scrolled and calls scrollToTop on click', () => {
    render(<BackToTopButton />)

    // Mock window.pageYOffset to simulate scrolling
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: 300,
    })

    // Trigger the scroll event
    fireEvent.scroll(window)

    let button = screen.getByText('Back to Top')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })

    // Mock window.pageYOffset to simulate scrolling back up
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: 100,
    })

    // Trigger the scroll event
    fireEvent.scroll(window)

    button = screen.queryByText('Back to Top')
    expect(button).not.toBeInTheDocument()
  })
})
