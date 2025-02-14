import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import './assets/styles/bootstrap.custom.css'
import {Provider} from 'react-redux'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import ManageUsersScreen from './screens/ManageUsersScreen'
import NewAdsScreen from './screens/NewAdsScreen'
import DashboardScreen from './screens/DashboardScreen'
import AnalyticsScreen from './screens/AnalyticsScreen'
import AdDetailsScreen from './screens/AdDetailsScreen.jsx'
import store from './store'
import './index.css'
import App from './App.jsx'


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route  path="dashboard" element={<DashboardScreen />} />
      <Route  path="manage" element={<ManageUsersScreen />} />
      <Route  path="ads" element={<NewAdsScreen />} />
      <Route  path="analytics" element={<AnalyticsScreen />} />
      <Route path="/ad-details/:id" element={<AdDetailsScreen />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>,
)