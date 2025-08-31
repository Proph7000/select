import { RefObject, useState, useEffect, KeyboardEvent } from 'react'

import { useDebounce } from '@shared/hooks'

export function useSelectSearch(
  optionsWrapperRef: RefObject<HTMLDivElement | null>,
) {
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 700)

  const optionsList =
    optionsWrapperRef.current && Array.from(optionsWrapperRef.current.children)

  useEffect(() => {
    if (!debouncedSearch) {
      return
    }

    const option = optionsList?.find((option) =>
      option.textContent?.includes(debouncedSearch),
    ) as HTMLElement | undefined

    option?.focus()

    setSearch('')
  }, [debouncedSearch, optionsList])

  const handleSearch = (e: KeyboardEvent<HTMLDivElement>) => {
    setSearch((prev) => prev + e.key)
  }

  return handleSearch
}
