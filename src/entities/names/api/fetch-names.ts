import { apiInstance } from '@shared/api-instance'

import { IFetchNamesResponse } from '../model'

export function fetchNames() {
  return apiInstance
    .get<IFetchNamesResponse>('/classes/Complete_List_Names')
    .then((res) => res.data)
}
