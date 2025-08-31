import { KeyboardEvent, RefObject, useCallback } from 'react'

import { ISelectOption } from '../types'

interface IUseHandleKeyDownProps {
  optionsWrapperRef: RefObject<HTMLDivElement | null>
  focusedIndex: number
  scrollToIndex: (index: number) => void
  options: ISelectOption[]
  visibleItems: number
  onSearch: (e: KeyboardEvent<HTMLDivElement>) => void
}

export function useHandleKeyDown({
  optionsWrapperRef,
  focusedIndex,
  scrollToIndex,
  options,
  visibleItems,
  onSearch,
}: IUseHandleKeyDownProps) {
  const ensureFocus = useCallback(
    (index: number) => {
      const targetElement = optionsWrapperRef.current?.querySelector(
        `[data-index="${index}"]`,
      ) as HTMLElement

      if (targetElement) {
        targetElement.focus()
      }
    },
    [optionsWrapperRef],
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()

      const newIndex = Math.max(0, focusedIndex - 1)

      scrollToIndex(newIndex)

      ensureFocus(newIndex)

      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()

      const newIndex = Math.min(options.length - 1, focusedIndex + 1)

      scrollToIndex(newIndex)

      ensureFocus(newIndex)

      return
    }

    if (e.key === 'Home') {
      e.preventDefault()

      scrollToIndex(0)

      ensureFocus(0)

      return
    }

    if (e.key === 'End') {
      e.preventDefault()

      scrollToIndex(options.length - 1)

      ensureFocus(options.length - 1)

      return
    }

    if (e.key === 'PageUp') {
      e.preventDefault()

      const newIndex = Math.max(0, focusedIndex - visibleItems)

      scrollToIndex(newIndex)

      ensureFocus(newIndex)

      return
    }

    if (e.key === 'PageDown') {
      e.preventDefault()

      const newIndex = Math.min(options.length - 1, focusedIndex + visibleItems)

      scrollToIndex(newIndex)

      ensureFocus(newIndex)

      return
    }

    if (e.key.length === 1) {
      onSearch(e)

      return
    }
  }

  return handleKeyDown
}
