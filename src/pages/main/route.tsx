import { RouteObject } from 'react-router-dom'

import { routeNamesPaths } from '@shared/constants'

import { MainPage } from './ui'

export const MainRouter: RouteObject = {
  path: routeNamesPaths.main,
  element: <MainPage />,
}
