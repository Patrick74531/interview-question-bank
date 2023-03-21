import React, {
  createContext,
  FC,
  useContext,
  useReducer,
  useState,
} from 'react'
import { PostsType } from '../../components/CardPreview'

export const postsData = []

const postsReducer = (state: PostsType[], action: AllAction): PostsType[] => {
  const { type } = action

  switch (type) {
    // case 'ANSWERS':
    //   let newAnswer = {
    //     userId: action.userId,
    //     answer: action.message,
    //   }

    //   return state.map((item) => {
    //     if (item.id === action.questionId) {
    //       return {
    //         ...item,
    //         answers: [...item.answers, newAnswer],
    //       }
    //     }
    //     return item
    //   })

    case 'ALL':
      const posts = action.newPosts
      return [...state, ...posts]

    default:
      throw new Error('Error')
  }
}

// type AnswersAction = {
//   type: 'ANSWERS'
//   message: string
//   userId: string
//   questionId: string | undefined
// }

type AllAction = {
  type: 'ALL'
  newPosts: PostsType[]
}

const initialPosts = {
  postsAnswers: postsData,
  // setPostsAnswers: (): void => {},
  setNewPosts: (): void => {},
  setAll: (): void => {},
  response: null,
  setResponse: (): void => {},
  gptAnswer: '',
  setGptAnswer: (): void => {},
}

export const PostsContext = createContext<{
  postsAnswers: PostsType[]
  // setPostsAnswers: React.Dispatch<AnswersAction>
  setAll: React.Dispatch<AllAction>
  setResponse: any
  response: any
  gptAnswer: string
  setGptAnswer: any
}>(initialPosts)

interface Props {
  children: React.ReactNode
}

export const PostsProvider: FC<Props> = ({ children }) => {
  const [postsAnswers, dispatch] = useReducer(postsReducer, postsData)
  const [response, setResponse] = useState(null)
  const [gptAnswer, setGptAnswer] = useState('')
  // const setPostsAnswers: React.Dispatch<AnswersAction> = (action) => {
  //   dispatch(action)
  // }

  const setAll: React.Dispatch<AllAction> = (action) => {
    dispatch(action)
  }

  return (
    <PostsContext.Provider
      value={{
        postsAnswers,
        setAll,
        response,
        setResponse,
        gptAnswer,
        setGptAnswer,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => useContext(PostsContext)
