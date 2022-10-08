import { Suspense } from 'react'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import Environment from './relay/Environment'
import { GlobalStyle } from './styles/global'
import { AuthProvider } from './context/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Routes } from './Routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes />
      <GlobalStyle />
    </div>
  )
}

function AppRoot() {
  return (
    <AuthProvider>
      <RelayEnvironmentProvider environment={Environment}>
        <Suspense fallback={'Loading...'}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </RelayEnvironmentProvider>
    </AuthProvider>
  )
}

export default AppRoot
