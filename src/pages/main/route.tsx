import { RouteObject } from 'react-router-dom'

import { routeNamesPaths } from '@shared/constants'

import { MainPage } from './ui'

export const MainPageRouter: RouteObject = {
  path: routeNamesPaths.main,
  element: <MainPage />,
}
