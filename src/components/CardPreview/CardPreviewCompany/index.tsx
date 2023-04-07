import { FC } from 'react'
import { CardPreviewCompanyType } from '../../../types'

const CardPreviewCompany: FC<CardPreviewCompanyType> = ({
  company,
  handleImageError,
  handleCompanyIntro,
}) => {
  return (
    <div className='flex flex-row justify-between items-center w-full pr-4'>
      <div className='relative mt-8 flex items-center gap-x-4'>
        <img
          src={`https://logo.clearbit.com/${company.name}.com`}
          alt=''
          className='h-10 w-10 rounded-full bg-gray-50'
          onError={handleImageError}
        />
        <div className='text-sm leading-6 cursor-pointer'>
          <p
            onClick={(event) => handleCompanyIntro(event)}
            className='font-semibold text-link-blue'
            data-testid='card-preview-company'
          >
            {company.name}
          </p>

          <p className='text-gray-600'>{company.city}</p>
        </div>
      </div>
    </div>
  )
}

export default CardPreviewCompany
