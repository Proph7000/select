import clsx from 'clsx'
import { useRef, useState, useEffect, RefObject, KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'

import { Fade, Presentation } from '@shared/ui'

import {
  delaySetHeight,
  IInputWrapperMeasurements,
  ISelectProps,
} from '../../model'
import {
  ISelectOption,
  calculateDropdownHeight,
  SELECT_CLASS_NAMES,
  handleKeyboardNavigation,
} from '../../model'
import { useCalculateStartPosition, useSelectSearch } from '../../model'

import { SelectOption } from './select-option'

import './select-options.css'

interface ISelectOptionsProps
  extends Pick<
    ISelectProps,
    | 'selectOptionsClassName'
    | 'selectOptionsStyles'
    | 'options'
    | 'optionsPosition'
    | 'visibleItems'
    | 'onChange'
    | 'onClose'
  > {
  open: boolean
  inputWrapperPosition: IInputWrapperMeasurements
  selectedValue: ISelectOption | null
  selectInputWrapperRef: RefObject<HTMLDivElement | null>
}

const TRANSITION_TIMEOUT = 300

export function SelectOptions({
  open,
  onClose,
  selectOptionsClassName,
  selectOptionsStyles,
  inputWrapperPosition,
  options,
  optionsPosition,
  visibleItems = 5,
  onChange,
  selectedValue,
  selectInputWrapperRef,
}: ISelectOptionsProps) {
  const presentationRef = useRef<HTMLDivElement>(null)
  const selectOptionsRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)
  const optionsWrapperRef = useRef<HTMLDivElement>(null)

  const gap = optionsPosition?.gap || 8

  useEffect(() => {
    if (!open || !selectOptionsRef.current) {
      return
    }

    setTimeout(() => {
      if (!selectOptionsRef.current) {
        return
      }

      const calculatedHeight = calculateDropdownHeight(
        selectOptionsRef.current,
        visibleItems,
      )

      calculatedHeight && setHeight(calculatedHeight)
    }, delaySetHeight)
  }, [visibleItems, open, options.length])

  const handleClickOption = (option: ISelectOption) => {
    onChange?.(option)

    onClose?.()

    setTimeout(() => {
      selectInputWrapperRef.current?.focus()
    }, 10)
  }

  const startPosition = useCalculateStartPosition({
    presentationElement: presentationRef.current,
    inputWrapperPosition,
    optionsPosition,
    gap,
    open,
  })

  const handleSearch = useSelectSearch(optionsWrapperRef)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const isNavigated = handleKeyboardNavigation(
      e,
      optionsWrapperRef.current,
      visibleItems,
    )

    if (isNavigated) {
      return
    }

    handleSearch(e)
  }

  return (
    <>
      {createPortal(
        <Fade in={open} timeout={TRANSITION_TIMEOUT} unmountOnExit>
          <Presentation onClick={onClose} ref={presentationRef}>
            <div
              onClick={(e) => e.stopPropagation()}
              ref={selectOptionsRef}
              className={clsx(
                SELECT_CLASS_NAMES.options,
                selectOptionsClassName,
              )}
              style={{
                ...selectOptionsStyles,
                top: startPosition,
                left: inputWrapperPosition.left,
                width: inputWrapperPosition.width,
                height: options.length <= visibleItems ? 'auto' : height,
              }}
            >
              <div
                className={SELECT_CLASS_NAMES.optionsWrapper}
                ref={optionsWrapperRef}
                onKeyDown={handleKeyDown}
                role='listbox'
              >
                {options.map((option, index) => (
                  <SelectOption
                    key={option.value}
                    option={option}
                    value={selectedValue}
                    onClick={() => handleClickOption(option)}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </Presentation>
        </Fade>,
        document.body,
      )}
    </>
  )
}
