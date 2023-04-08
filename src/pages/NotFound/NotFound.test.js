import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NotFound from './index'

describe('NotFound component', () => {
  test('renders 404 title and description', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )

    const title = screen.getByText(/404/i)
    expect(title).toBeInTheDocument()

    const description = screen.getByText(/Sorry, the page is not found./i)
    expect(description).toBeInTheDocument()
  })

  test('renders go back button', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )

    const goBackButton = screen.getByText(/go back/i)
    expect(goBackButton).toBeInTheDocument()
  })
})
