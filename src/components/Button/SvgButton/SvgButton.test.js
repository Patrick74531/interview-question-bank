import { render, screen, fireEvent } from '@testing-library/react'
import SvgButton from './index'

describe('SvgButton', () => {
  const handleClick = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the button with the provided aria-label', () => {
    render(
      <SvgButton
        handleClick={handleClick}
        isBookmarked={false}
        ariaLabel='Bookmark'
      />
    )
    const button = screen.getByRole('button', { name: 'Bookmark' })
    expect(button).toBeInTheDocument()
  })

  test('renders BookmarkIcon with the provided color based on isBookmarked', () => {
    const { rerender } = render(
      <SvgButton
        handleClick={handleClick}
        isBookmarked={false}
        ariaLabel='Bookmark'
      />
    )
    const svgIcon = screen.getByTestId('bookmark-icon', { name: /bookmark/i })
    expect(svgIcon).toHaveStyle({ color: 'grey' })

    rerender(
      <SvgButton
        handleClick={handleClick}
        isBookmarked={true}
        ariaLabel='Bookmark'
      />
    )
    expect(svgIcon).toHaveStyle({ color: 'lightblue' })
  })

  test('calls handleClick when button is clicked', () => {
    render(
      <SvgButton
        handleClick={handleClick}
        isBookmarked={false}
        ariaLabel='Bookmark'
      />
    )
    const button = screen.getByRole('button', { name: 'Bookmark' })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
