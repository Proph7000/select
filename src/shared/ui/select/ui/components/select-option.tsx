import clsx from 'clsx'
import { useRef, useEffect } from 'react'

import { delaySetHeight, ISelectOption, SELECT_CLASS_NAMES } from '../../model'

import './select-option.css'

interface ISelectOptionProps {
  option: ISelectOption
  value: ISelectOption | null
  onClick: () => void
  index: number
}

export function SelectOption({
  option,
  value,
  onClick,
  index,
}: ISelectOptionProps) {
  const optionRef = useRef<HTMLDivElement>(null)

  const selected = option.value === value?.value

  useEffect(() => {
    if (index === 0 || selected) {
      setTimeout(() => {
        optionRef.current?.focus()
      }, delaySetHeight + 10)
    }
  }, [index, selected])

  return (
    <div
      key={option.value}
      className={clsx(SELECT_CLASS_NAMES.option, {
        selected,
      })}
      onClick={onClick}
      role='option'
      aria-selected={selected}
      tabIndex={0}
      ref={optionRef}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick()
        }
      }}
    >
      {option.label}
    </div>
  )
}
