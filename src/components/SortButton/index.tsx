import { FC } from 'react'
import { useQuestions } from '../../context/QuestionsContext'
import { SET_POSTS_DATA } from '../../context/QuestionsContext/anctions/ActionTypes'
import { IsSortActiveType } from '../../types'
const SortButton: FC<IsSortActiveType> = ({
  isSortActive,
  setIsSortActive,
}) => {
  const { postsData, dispatch } = useQuestions()
  const sortByDate = () => {
    const sortedPosts = [...postsData].sort((a, b) => {
      const dateA: Date = new Date(a.date)
      const dateB: Date = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    })

    dispatch({ type: SET_POSTS_DATA, payload: sortedPosts })
    setIsSortActive(true)
  }

  return (
    <button
      onClick={sortByDate}
      className={`hover:text-blue-500 ${isSortActive ? 'text-blue-500' : ''}`}
      aria-label='Sort by date'
    >
      Date
    </button>
  )
}

export default SortButton
