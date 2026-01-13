import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '@store/store.js'
import '@styles/index.css'
import App from '@app/App.jsx'
// import UserMiddleware from './app/providers/UserMiddleware.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    {/*
    <Provider store={store}>
      <UserMiddleware>
        <App />
      </UserMiddleware>
    </Provider>
    */}
  </StrictMode>,
)
