import { useState, useEffect, KeyboardEvent, useTransition } from 'react'

import { useDebounce } from '@shared/hooks'

import { ISelectOption } from '../types'

export function useSelectSearch(
  options: ISelectOption[],
  onNavigateToIndex: (index: number) => void,
) {
  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()

  const debouncedSearch = useDebounce(search, 700)

  useEffect(() => {
    if (!debouncedSearch) {
      return
    }

    startTransition(() => {
      const searchLower = debouncedSearch.toLowerCase()

      const foundIndex = options.findIndex((option) =>
        option.label.toLowerCase().includes(searchLower),
      )

      if (foundIndex !== -1) {
        onNavigateToIndex(foundIndex)
      }

      setSearch('')
    })
  }, [debouncedSearch, options, onNavigateToIndex])

  const handleSearch = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key.length === 1) {
      setSearch((prev) => prev + e.key)
    }
  }

  return { handleSearch, isPending, search }
}
