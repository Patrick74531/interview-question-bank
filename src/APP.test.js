import { render, screen } from '@testing-library/react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import App from './App'

describe('App', () => {
  test('renders navigation and question bank', () => {
    const history = createMemoryHistory()

    render(
      <BrowserRouter history={history}>
        <Routes>
          <Route path='/' element={<App />} />
        </Routes>
      </BrowserRouter>
    )

    // assert that navigation is rendered
    expect(screen.getByTestId('navigation')).toBeInTheDocument()

    // assert that the question bank is rendered
    expect(screen.getByTestId('question-bank')).toBeInTheDocument()
  })
})
