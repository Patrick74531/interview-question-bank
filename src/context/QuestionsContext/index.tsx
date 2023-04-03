import { FC, createContext, useReducer, useContext } from 'react'

import { Action, PostsContextType, QuestionsProviderType } from '../../types'

import {
  SET_RESPONSE,
  SET_GPT_ANSWER,
  SET_POSTS_DATA,
  SET_SNACKBAR_STATE,
  SET_INFO_MODAL_OPEN,
} from './anctions/ActionTypes'

const initialState: PostsContextType = {
  response: null,
  gptAnswer: '',
  postsData: [],
  snackBarState: {
    open: false,
    vertical: 'top',
    horizontal: 'center',
  },
  isInfoModalOpen: false,
  dispatch: () => {},
}

const QuestionsContext = createContext(initialState)

const reducer = (state: PostsContextType, action: Action) => {
  switch (action.type) {
    case SET_RESPONSE:
      return { ...state, response: action.payload }
    case SET_GPT_ANSWER:
      return { ...state, gptAnswer: action.payload }
    case SET_POSTS_DATA:
      return { ...state, postsData: action.payload }
    case SET_SNACKBAR_STATE:
      return { ...state, snackBarState: action.payload }
    case SET_INFO_MODAL_OPEN:
      return { ...state, isInfoModalOpen: action.payload }

    default:
      return state
  }
}

export const QuestionsProvider: FC<QuestionsProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <QuestionsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuestionsContext.Provider>
  )
}

export const useQuestions = () => useContext(QuestionsContext)
