import {
  createBrowserRouter,
  Navigate,
  RouterProvider as ReactRouterProvider,
} from 'react-router-dom'

import { baseRoute, routeNamesPaths } from '@shared/constants'

import { MainLayout } from '../layouts'

const router = createBrowserRouter(
  [
    {
      path: routeNamesPaths.main,
      element: <MainLayout />,
      children: [],
    },
    {
      path: '*',
      element: <Navigate to={routeNamesPaths.main} />,
    },
  ],
  {
    basename: baseRoute,
  },
)

export function RouterProvider() {
  return <ReactRouterProvider router={router} />
}
