import { FC } from 'react'
import { useImageError } from '../../../hooks/imageErrorHooks'
import { SearchResultsType } from '../../../types'
const SearchResults: FC<SearchResultsType> = ({
  name,
  description,
  id,
  scrollToSearchQuestions,
}) => {
  const { handleImageError } = useImageError()
  return (
    <div
      onClick={() => scrollToSearchQuestions(id)}
      className='flex items-center w-full p-2 hover:bg-gray-100 cursor-pointer border-none'
    >
      <img
        className='w-8 h-auto rounded-full mr-2'
        src={`https://logo.clearbit.com/${name}.com`}
        alt={name}
        onError={handleImageError}
      />
      <span className='truncate'>{description}</span>
    </div>
  )
}

export default SearchResults
