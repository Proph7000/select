import axios from 'axios'

import { ENV_CONSTANTS } from '@shared/constants'

export const apiInstance = axios.create({
  baseURL: ENV_CONSTANTS.apiUrl,
  headers: {
    'X-Parse-Application-Id': ENV_CONSTANTS.appId,
    'X-Parse-Master-Key': ENV_CONSTANTS.masterKey,
    'Content-Type': 'application/json',
  },
})
