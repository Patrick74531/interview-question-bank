import { ChangeEvent, ReactNode } from 'react'
import { SnackbarOrigin } from '@mui/material/Snackbar'
import {
  SET_RESPONSE,
  SET_GPT_ANSWER,
  SET_POSTS_DATA,
  SET_SNACKBAR_STATE,
  SET_INFO_MODAL_OPEN,
} from '../context/QuestionsContext/anctions/ActionTypes'
export type PostsType = {
  id: string
  description: string
  date: string
  datetime: string
  industry: { title: string; category: string }
  company: {
    name: string
    city: string
    intro: string
  }
  answers: {
    id: string
    userId: string
    answer: string
  }[]
}

export type SortButtonProps = {
  posts: PostsType[]
  setPosts: (posts: PostsType[]) => void
}

export type InputType = {
  questionId: string | undefined
}

export type AnswersProps = {
  answer: string
}

export type AuthButtonType = {
  name: string
}

export type AuthInputType = {
  name: string
  type: string
  placeholder: string
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void
}
export type IndustryType = {
  industry: string
}

export type UserType = {
  email: string
  id: string
  name: string
  posts: any
  token: any
}

export type IUserContext = {
  isLoggedIn: boolean
  user: UserType
  login: (u: UserType, expirationDate?: any) => void
  logout: () => void
  expirationDateState: any
}

export type IsSortActiveType = {
  isSortActive: boolean
  setIsSortActive: any
}

export type SnackbarType = SnackbarOrigin & {
  open: boolean
}

export type Action =
  | { type: typeof SET_RESPONSE; payload: any }
  | { type: typeof SET_GPT_ANSWER; payload: string }
  | { type: typeof SET_POSTS_DATA; payload: PostsType[] }
  | { type: typeof SET_SNACKBAR_STATE; payload: SnackbarType }
  | { type: typeof SET_INFO_MODAL_OPEN; payload: boolean }

export type PostsContextType = {
  response: any
  gptAnswer: string
  postsData: PostsType[]
  snackBarState: SnackbarType
  isInfoModalOpen: boolean
  dispatch: React.Dispatch<Action>
}
export type QuestionsProviderType = {
  children: ReactNode
}

export type InfoModalType = {
  isOpen: boolean
  children: ReactNode
  onClose: () => void
}

export type CompanyIntroType = {
  companyIntro: string
}
