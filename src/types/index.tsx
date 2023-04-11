import { ChangeEvent, ReactNode, MouseEvent, SyntheticEvent } from 'react'
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
  posts: PostsType[]
  token: string | null
}

export type IUserContext = {
  isLoggedIn: boolean
  user: UserType
  login: (u: UserType, expirationDate?: Date) => void
  logout: () => void
  expirationDateState: Date | null
}

export type IsSortActiveType = {
  isSortActive: boolean
  setIsSortActive: (e: boolean) => void
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
export type QuestionBankHeadingType = {
  scrollToLastViewedQuestion: () => void
  title: string
  subtitle: string
}
export type PrimaryButtonType = {
  handleClick?: () => void | Promise<void> | undefined
  ariaLabel: string
  title: string
  type?: 'button' | 'submit' | 'reset' | undefined
}

export type SvgButtonType = {
  handleClick: () => void
  isBookmarked: boolean
  ariaLabel: string
}

export type CardPreviewCompanyType = {
  company: {
    name: string
    city: string
  }
  handleImageError: (event: SyntheticEvent<HTMLImageElement>) => void
  handleCompanyIntro: (event: MouseEvent<HTMLElement>) => void
}

export type HttpClientHookReturnType = {
  isLoading: boolean
  error: string | null
  isOpen: boolean
  sendRequest: (
    url: string,
    method?: string,
    body?: string | null,
    headers?: Record<string, string>
  ) => Promise<any>
  clearError: () => void
  setIsOpen: (open: boolean) => void
}

export type CardPreviewQuestionType = {
  props: PostsType & {
    isBookmarked: boolean
    setBookmarkedId: (id: string | null) => void
  }
}

export type ChevronButtonType = {
  isOpen: boolean
  handleClick: () => void
  toggleButtonLabel: string
}

export type InfoformInputType = {
  title: string
  value: string
  handleChange: (e: string) => void
}

export type InfoFormSelectType = {
  value: string
  title: string
  optionsData: string[]
  handleChange: (e: string) => void
}

export type TextareaType = {
  placeholder: string
  minLength: number
  title: string
  value: string
  textAreaHeight?: string
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export type ErrorModalType = {
  isOpen: boolean
  onClose: () => void
  error: any
}

export type SearchResultsType = {
  name: string
  description: string
  id: string
  scrollToSearchQuestions: (id: string) => void
}

export type SearchBoxType = {
  scrollToSearchQuestions: (id: string) => void
}
