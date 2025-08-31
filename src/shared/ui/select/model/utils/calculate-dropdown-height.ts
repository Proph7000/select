import { SELECT_CLASS_NAMES } from '../constants'

export function calculateDropdownHeight(
  element: HTMLElement,
  visibleItems: number,
) {
  const dropdownElement = element

  if (!dropdownElement) {
    return
  }

  const itemElement = dropdownElement.querySelector(
    `.${SELECT_CLASS_NAMES.option}`,
  ) as HTMLElement | null

  const optionsWrapperElement = dropdownElement.querySelector(
    `.${SELECT_CLASS_NAMES.optionsWrapper}`,
  ) as HTMLElement | null

  if (!itemElement || !optionsWrapperElement) {
    return
  }

  const itemHeight = itemElement.offsetHeight
  const optionsWrapperStyles = window.getComputedStyle(optionsWrapperElement)
  const dropdownStyles = window.getComputedStyle(dropdownElement)

  const itemGap = parseInt(optionsWrapperStyles.gap)
  const dropdownPaddingTop = parseInt(dropdownStyles.paddingTop)
  const dropdownPaddingBottom = parseInt(dropdownStyles.paddingBottom)

  const totalItemsHeight = visibleItems * itemHeight
  const totalGapsHeight = (visibleItems - 1) * itemGap

  const calculatedHeight =
    dropdownPaddingTop +
    dropdownPaddingBottom +
    totalItemsHeight +
    totalGapsHeight

  return calculatedHeight
}
