import { render, screen } from '@testing-library/react'
import CustomSnackBar from './index'

jest.mock('../../../context/QuestionsContext', () => ({
  useQuestions: () => ({
    snackBarState: {
      vertical: 'bottom',
      horizontal: 'center',
      open: true, // Set this to true for testing
    },
    dispatch: jest.fn(),
  }),
}))

describe('CustomSnackBar', () => {
  test('renders Snackbar with given message', () => {
    const message = 'Sample message'

    render(<CustomSnackBar message={message} />)

    // Assuming snackBarState.open is set to true initially
    const alert = screen.getByText(message)
    expect(alert).toBeInTheDocument()

    // Simulate closing the Snackbar and any other test steps
  })
})
