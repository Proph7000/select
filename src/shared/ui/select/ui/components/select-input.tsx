import clsx from 'clsx'
import { KeyboardEvent, RefObject } from 'react'

import ArrowUp from '@shared/assets/icons/arrow-up.svg?react'

import { ISelectProps, ISelectOption } from '../../model'

import './select-input.css'

interface ISelectInputProps
  extends Pick<
    ISelectProps,
    | 'selectStyles'
    | 'fullWidth'
    | 'selectRef'
    | 'label'
    | 'id'
    | 'onBlur'
    | 'onFocus'
    | 'open'
    | 'placeholder'
    | 'disabled'
    | 'autoComplete'
    | 'autoFocus'
    | 'selectClassName'
    | 'onKeyDown'
  > {
  selectInputId: string
  selectInputWrapperRef: RefObject<HTMLDivElement | null>
  handleClickInput: () => void
  isOpen: boolean
  selectedValue: ISelectOption | null
}

export function SelectInput({
  selectStyles,
  fullWidth,
  selectRef,
  label,
  id,
  selectInputId,
  selectInputWrapperRef,
  onBlur,
  onFocus,
  handleClickInput,
  open,
  isOpen,
  selectedValue,
  placeholder,
  disabled,
  autoComplete,
  autoFocus,
  selectClassName,
  onKeyDown,
}: ISelectInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleClickInput()
    }

    onKeyDown?.(e)
  }

  return (
    <div
      className={clsx('select-wrapper', selectStyles, {
        'full-width': fullWidth,
      })}
      ref={selectRef}
    >
      {label && <label htmlFor={id || selectInputId}>{label}</label>}

      <div
        className={clsx('select-input-wrapper', {
          opened: open || isOpen,
          disabled,
        })}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={handleClickInput}
        onKeyDown={handleKeyDown}
        role='combobox'
        aria-expanded={isOpen || open}
        aria-haspopup='listbox'
        aria-controls={selectInputId}
        aria-label={label || 'Select option'}
        tabIndex={disabled ? -1 : 0}
        ref={selectInputWrapperRef}
        aria-disabled={disabled}
      >
        <input
          className={clsx('select-input', selectClassName)}
          id={id || selectInputId}
          value={selectedValue?.label || ''}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={!autoComplete}
          autoFocus={autoFocus}
          tabIndex={-1}
          aria-hidden='true'
        />

        {!disabled && (
          <ArrowUp
            className={clsx('select-input-arrow', { opened: isOpen || open })}
            aria-hidden='true'
          />
        )}
      </div>
    </div>
  )
}
