import clsx from 'clsx'
import { useRef, useEffect, RefObject, CSSProperties } from 'react'

import { ISelectOption, SELECT_CLASS_NAMES } from '../../model'

import './select-option.css'

interface ISelectOptionProps {
  option: ISelectOption
  value: ISelectOption | null
  onClick: () => void
  index: number
  selectInputWrapperRef: RefObject<HTMLDivElement | null>
  style?: CSSProperties
  preventFocus?: boolean
  isFocused?: boolean
}

export function SelectOption({
  option,
  value,
  onClick,
  selectInputWrapperRef,
  style,
  preventFocus,
  isFocused,
  index,
}: ISelectOptionProps) {
  const optionRef = useRef<HTMLDivElement>(null)

  const selected = option.value === value?.value

  useEffect(() => {
    if (isFocused && !preventFocus) {
      optionRef.current?.focus()
    }
  }, [isFocused, preventFocus])

  return (
    <div
      key={option.value}
      className={clsx(SELECT_CLASS_NAMES.option, {
        selected,
        focused: isFocused,
      })}
      style={style}
      onClick={onClick}
      role='option'
      aria-selected={selected}
      tabIndex={0}
      ref={optionRef}
      data-index={index}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick()

          setTimeout(() => {
            selectInputWrapperRef.current?.focus()
          }, 100)
        }
      }}
    >
      {option.label}
    </div>
  )
}
