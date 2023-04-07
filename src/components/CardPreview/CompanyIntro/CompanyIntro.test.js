import { render, screen } from '@testing-library/react'
import CompanyIntro from './index'

const mockCompanyIntro = 'This is a test company introduction.'

test('CompanyIntro renders without crashing', () => {
  render(<CompanyIntro companyIntro={mockCompanyIntro} />)

  const titleElement = screen.getByText('Company Introduction')
  expect(titleElement).toBeInTheDocument()

  const introElement = screen.getByText(mockCompanyIntro)
  expect(introElement).toBeInTheDocument()

  const gptElement = screen.getByText('---provided by GPT')
  expect(gptElement).toBeInTheDocument()
})
