import { ChangeEvent, useState, useEffect, FC } from 'react'
import { useQuestions } from '../../../context/QuestionsContext'
import { PostsType, SearchBoxType } from '../../../types'
import SearchResults from '../SearchResults'
import SearchIcon from '@mui/icons-material/Search'
import SvgIcon from '@mui/icons-material/Search'

const SearchBox: FC<SearchBoxType> = ({ scrollToSearchQuestions }) => {
  const [searchText, setSearchText] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<PostsType[] | undefined>(
    []
  )
  const { postsData } = useQuestions()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const searchTextArray = searchText.toLowerCase().split(' ')
    let results: PostsType[] | undefined
    if (searchText !== '') {
      results = postsData.filter((post) =>
        searchTextArray.some(
          (item) =>
            post.company.name.toLowerCase().includes(item) ||
            post.description.toLowerCase().includes(item)
        )
      )
    }

    setFilteredPosts(results)
  }, [postsData, searchText])

  return (
    <div className='mb-12 h-10 relative'>
      <div className='absolute top-0 mt-6 flex max-w-sm sm:max-w-xl z-20'>
        <label htmlFor='email-address' className='sr-only'>
          search box
        </label>
        <div className='shadow-md rounded-md overflow-hidden'>
          <div className='relative'>
            <SvgIcon
              sx={{
                position: 'absolute',
                top: '50%',
                left: '5px',
                transform: 'translate(0,-50%)',
                color: 'purple',
              }}
            >
              <SearchIcon />
            </SvgIcon>
            <input
              id='email-address'
              name='email'
              type='email'
              autoComplete='email'
              required
              className='ml-5 w-96 sm:w-128 flex-auto border-none focus:ring-0 bg-white/5 px-3.5 py-2 sm:text-sm sm:leading-6'
              placeholder='search questions or companies'
              onChange={(e) => handleSearch(e)}
            />
          </div>

          <div className='flex flex-col border-none bg-white'>
            {filteredPosts &&
              filteredPosts
                .slice(0, 10)
                .map((item) => (
                  <SearchResults
                    key={item.id}
                    name={item.company.name}
                    description={item.description}
                    scrollToSearchQuestions={scrollToSearchQuestions}
                    id={item.id}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBox
