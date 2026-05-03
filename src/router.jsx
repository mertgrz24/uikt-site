import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CountryPage from './pages/CountryPage'
import VerificationPage from './pages/VerificationPage'
import EventsPage from './pages/EventsPage'
import TheoriesPage from './pages/TheoriesPage'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/country/:id', element: <CountryPage /> },
  { path: '/verify', element: <VerificationPage /> },
  { path: '/events', element: <EventsPage /> },
  { path: '/theories', element: <TheoriesPage /> },
])
