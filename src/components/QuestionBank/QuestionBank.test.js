import { render, waitFor } from '@testing-library/react'
import QuestionBank from './index'
import { BrowserRouter } from 'react-router-dom'

describe('QuestionBank component', () => {
  const mockNavigate = jest.fn()

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }))

  jest.mock('../../hooks/httpHooks', () => ({
    useHttpClient: () => ({
      isLoading: false,
      error: null,
      sendRequest: jest.fn(),
    }),
  }))

  jest.mock('../../context/UserContext', () => ({
    useUsers: () => ({
      user: { token: 'sample_token' },
    }),
  }))

  test('renders cards correctly', async () => {
    // Mock the API response
    const mockResponse = [
      {
        id: '1',
        description: 'This is the first question',
        date: '2022-01-01',
        datetime: '2022-01-01T00:00:00.000Z',
        industry: 'technology',
        company: {
          name: 'Google',
          city: 'Mountain View',
        },
        answers: [
          {
            id: '1',
            answer: 'This is the first answer',
          },
        ],
      },
    ]

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    })

    // Render the component
    render(
      <BrowserRouter>
        <QuestionBank industry='technology' />
      </BrowserRouter>
    )

    // Wait for the API call to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
  })
})
