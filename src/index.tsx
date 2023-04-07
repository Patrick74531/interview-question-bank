import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { UsersProvider } from './context/UserContext'
import { BrowserRouter } from 'react-router-dom'
import { QuestionsProvider } from './context/QuestionsContext'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <QuestionsProvider>
          <App />
        </QuestionsProvider>
      </UsersProvider>
    </BrowserRouter>
  </React.StrictMode>
)
