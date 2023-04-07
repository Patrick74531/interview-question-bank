import { render, screen, fireEvent } from '@testing-library/react'
import ChevronButton from './index'

describe('ChevronButton', () => {
  const handleClick = jest.fn()

  test('renders ChevronDownIcon when isOpen is false', () => {
    render(
      <ChevronButton
        isOpen={false}
        handleClick={handleClick}
        toggleButtonLabel='Toggle'
      />
    )
    const chevronDownIcon = screen.getByTestId('chevron-down-icon')
    expect(chevronDownIcon).toBeInTheDocument()
    expect(screen.getByText('More')).toBeInTheDocument()
  })

  test('renders ChevronUpIcon when isOpen is true', () => {
    render(
      <ChevronButton
        isOpen={true}
        handleClick={handleClick}
        toggleButtonLabel='Toggle'
      />
    )
    const chevronUpIcon = screen.getByTestId('chevron-up-icon')
    expect(chevronUpIcon).toBeInTheDocument()
    expect(screen.getByText('More')).toBeInTheDocument()
  })

  test('calls handleClick when button is clicked', () => {
    render(
      <ChevronButton
        isOpen={false}
        handleClick={handleClick}
        toggleButtonLabel='Toggle'
      />
    )
    const button = screen.getByRole('button', { name: 'Toggle' })
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
