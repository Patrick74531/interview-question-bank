import { render, screen, fireEvent } from '@testing-library/react'
import CardPreviewCompany from './index'

const mockCompany = {
  name: 'Test Company',
  city: 'Test City',
}

const handleImageError = jest.fn()
const handleCompanyIntro = jest.fn()

test('CardPreviewCompany renders without crashing', () => {
  render(
    <CardPreviewCompany
      company={mockCompany}
      handleImageError={handleImageError}
      handleCompanyIntro={handleCompanyIntro}
    />
  )
})

test('CardPreviewCompany displays the correct company information', () => {
  render(
    <CardPreviewCompany
      company={mockCompany}
      handleImageError={handleImageError}
      handleCompanyIntro={handleCompanyIntro}
    />
  )

  const companyNameElement = screen.getByText(mockCompany.name)
  const companyCityElement = screen.getByText(mockCompany.city)

  expect(companyNameElement).toBeInTheDocument()
  expect(companyCityElement).toBeInTheDocument()
})

test('CardPreviewCompany calls handleCompanyIntro when company name is clicked', () => {
  render(
    <CardPreviewCompany
      company={mockCompany}
      handleImageError={handleImageError}
      handleCompanyIntro={handleCompanyIntro}
    />
  )

  const companyNameElement = screen.getByText(mockCompany.name)
  fireEvent.click(companyNameElement)

  expect(handleCompanyIntro).toHaveBeenCalledTimes(1)
})
