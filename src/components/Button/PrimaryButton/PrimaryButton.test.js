import { render, screen, fireEvent } from '@testing-library/react'
import PrimaryButton from './index'

describe('PrimaryButton', () => {
  const handleClick = jest.fn()

  test('renders the button with the provided title', () => {
    render(
      <PrimaryButton
        handleClick={handleClick}
        ariaLabel='Submit'
        title='Submit'
        type='button'
      />
    )
    const button = screen.getByRole('button', { name: 'Submit' })
    expect(button).toBeInTheDocument()
  })

  test('calls handleClick when button is clicked', () => {
    render(
      <PrimaryButton
        handleClick={handleClick}
        ariaLabel='Submit'
        title='Submit'
        type='button'
      />
    )
    const button = screen.getByRole('button', { name: 'Submit' })
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('has the correct button type', () => {
    render(
      <PrimaryButton
        handleClick={handleClick}
        ariaLabel='Submit'
        title='Submit'
        type='submit'
      />
    )
    const button = screen.getByRole('button', { name: 'Submit' })
    expect(button).toHaveAttribute('type', 'submit')
  })
})
