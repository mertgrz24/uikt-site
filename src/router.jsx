import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CountryPage from './pages/CountryPage'
import VerificationPage from './pages/VerificationPage'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/country/:id', element: <CountryPage /> },
  { path: '/verify', element: <VerificationPage /> },
])
