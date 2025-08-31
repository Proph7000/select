import { KeyboardEvent } from 'react'

import { SELECT_CLASS_NAMES } from '../constants'

export const handleKeyboardNavigation = (
  e: KeyboardEvent<HTMLDivElement>,
  element: HTMLElement | null,
  pageSize?: number,
): boolean => {
  if (!element) {
    return false
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()

    const prevFocusedOption = element?.querySelector(
      `.${SELECT_CLASS_NAMES.option}:focus`,
    )?.previousElementSibling as HTMLElement

    prevFocusedOption?.focus()

    return true
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()

    const nextFocusedOption = element?.querySelector(
      `.${SELECT_CLASS_NAMES.option}:focus`,
    )?.nextElementSibling as HTMLElement

    nextFocusedOption?.focus()

    return true
  }

  if (e.key === 'Home') {
    e.preventDefault()

    const firstOption = element?.querySelector(
      `.${SELECT_CLASS_NAMES.option}`,
    ) as HTMLElement

    firstOption?.focus()

    return true
  }

  if (e.key === 'End') {
    e.preventDefault()

    const lastOption = element?.querySelector(
      `.${SELECT_CLASS_NAMES.option}:last-child`,
    ) as HTMLElement

    lastOption?.focus()

    return true
  }

  if (!pageSize) {
    return false
  }

  if (e.key === 'PageUp') {
    e.preventDefault()

    const currentFocused = element?.querySelector(
      `.${SELECT_CLASS_NAMES.option}:focus`,
    ) as HTMLElement

    if (currentFocused) {
      const currentIndex = Array.from(element.children).indexOf(currentFocused)
      const targetIndex = Math.max(0, currentIndex - pageSize - 1)
      const targetOption = element.children[targetIndex] as HTMLElement

      targetOption?.focus()
    }

    return true
  }

  if (e.key === 'PageDown') {
    e.preventDefault()

    const currentFocused = element?.querySelector(
      `.${SELECT_CLASS_NAMES.option}:focus`,
    ) as HTMLElement

    if (currentFocused) {
      const currentIndex = Array.from(element.children).indexOf(currentFocused)

      const targetIndex = Math.min(
        element.children.length - 1,
        currentIndex + pageSize - 1,
      )

      const targetOption = element.children[targetIndex] as HTMLElement

      targetOption?.focus()
    }

    return true
  }

  return false
}
