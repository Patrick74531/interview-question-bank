import { FC } from 'react'
import { CompanyIntroType } from '../../types'

const CompanyIntro: FC<CompanyIntroType> = ({ companyIntro }) => {
  return (
    <div className='relative'>
      <h1>Company Introduction</h1>
      <p className='max-w-3xl text-sm leading-6 text-font-secondary p-4'>
        {/* {company.intro} */}
        {companyIntro}
      </p>
      <span className='absolute bottom-0 right-0 text-sm text-font-secondary'>
        ---provided by GPT
      </span>
    </div>
  )
}

export default CompanyIntro
