import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Loader from './index'

test('renders the loader with correct attributes', () => {
  render(<Loader />)

  const loaderContainer = screen.getByRole('status', { name: 'Loading' })
  expect(loaderContainer).toBeInTheDocument()

  const loader = screen.getByTestId('loader-spinner')
  expect(loader).toBeInTheDocument()
  expect(loader).toHaveClass(
    'rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'
  )
})
