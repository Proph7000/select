import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@shared/constants'

import { fetchNames } from '../../api'
import { IFetchNamesResponse } from '../types'

export function useNames<T = IFetchNamesResponse>(
  select?: (data: IFetchNamesResponse) => T,
) {
  const query = useQuery({
    queryKey: [queryKeys.names],
    queryFn: fetchNames,
    select,
  })

  return query
}
