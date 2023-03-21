import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App'
import { PostsProvider } from './context/PostsContext'
import { UsersProvider } from './context/UserContext'
import { BrowserRouter } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <PostsProvider>
          <App />
        </PostsProvider>
      </UsersProvider> 
    </BrowserRouter>
  </React.StrictMode>
)
