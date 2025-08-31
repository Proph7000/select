import { useVirtualizer } from '@tanstack/react-virtual'
import clsx from 'clsx'
import { useRef, RefObject, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

import { Fade, Presentation } from '@shared/ui'

import {
  IInputWrapperMeasurements,
  ISelectProps,
  ISelectOption,
  SELECT_CLASS_NAMES,
  useCalculateStartPosition,
  useSelectSearch,
  useHandleKeyDown,
} from '../../model'

import { SelectOption } from './select-option'

import './select-options.css'

const OPTION_ITEM_HEIGHT = 24
const OPTION_LIST_PADDING_Y = 8
const GAP = 8
const TRANSITION_TIMEOUT = 300

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
  const optionsWrapperRef = useRef<HTMLDivElement>(null)

  const [preventFocus, setPreventFocus] = useState<boolean>(false)
  const [focusedIndex, setFocusedIndex] = useState<number>(0)

  const dropdownHeight =
    OPTION_ITEM_HEIGHT * visibleItems +
    GAP * (visibleItems - 1) +
    OPTION_LIST_PADDING_Y * 2

  const gap = optionsPosition?.gap || 8

  const handleClickOption = (option: ISelectOption) => {
    onChange?.(option)

    onClose?.()
  }

  const startPosition = useCalculateStartPosition({
    presentationElement: presentationRef.current,
    inputWrapperPosition,
    optionsPosition,
    gap,
    open,
  })

  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => OPTION_ITEM_HEIGHT + gap,
    overscan: 5,
  })

  const scrollToIndex = useCallback(
    (index: number) => {
      setFocusedIndex(index)

      rowVirtualizer.scrollToIndex(index)

      requestAnimationFrame(() => {
        const targetElement = optionsWrapperRef.current?.querySelector(
          `[data-index="${index}"]`,
        ) as HTMLElement

        if (targetElement) {
          targetElement.focus()
        }
      })
    },
    [rowVirtualizer],
  )

  const { handleSearch, isPending, search } = useSelectSearch(
    options,
    scrollToIndex,
  )

  const handleKeyDown = useHandleKeyDown({
    optionsWrapperRef,
    focusedIndex,
    scrollToIndex,
    options,
    visibleItems,
    onSearch: handleSearch,
  })

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setPreventFocus(true)
      }, 300)
    } else {
      setPreventFocus(false)
    }
  }, [open])

  useEffect(() => {
    if (open && selectedValue) {
      const selectedIndex = options.findIndex(
        (option) => option.value === selectedValue.value,
      )

      if (selectedIndex !== -1) {
        setFocusedIndex(selectedIndex)

        scrollToIndex(selectedIndex)
      }
    }
  }, [open, selectedValue, options, setFocusedIndex, scrollToIndex])

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
                height:
                  options.length <= visibleItems ? 'auto' : dropdownHeight,
                paddingTop: OPTION_LIST_PADDING_Y,
                paddingBottom: OPTION_LIST_PADDING_Y,
              }}
            >
              <div
                className={SELECT_CLASS_NAMES.optionsWrapper}
                ref={optionsWrapperRef}
                onKeyDown={handleKeyDown}
                role='listbox'
                style={{ height: dropdownHeight, gap: GAP }}
              >
                {(isPending || search) && (
                  <div className={SELECT_CLASS_NAMES.search}>
                    {isPending ? 'Searching...' : `Search: "${search}"`}
                  </div>
                )}

                <div
                  ref={parentRef}
                  style={{ height: '100%', overflow: 'auto', paddingRight: 4 }}
                >
                  <div
                    style={{
                      height: `${rowVirtualizer.getTotalSize()}px`,
                      position: 'relative',
                    }}
                    role='list'
                    className={SELECT_CLASS_NAMES.optionsList}
                  >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                      const option = options[virtualRow.index]

                      return (
                        <SelectOption
                          key={virtualRow.key}
                          option={option}
                          value={selectedValue}
                          onClick={() => handleClickOption(option)}
                          index={virtualRow.index}
                          selectInputWrapperRef={selectInputWrapperRef}
                          preventFocus={preventFocus}
                          isFocused={virtualRow.index === focusedIndex}
                          style={{
                            height: OPTION_ITEM_HEIGHT,
                            transform: `translateY(${virtualRow.start}px)`,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Presentation>
        </Fade>,
        document.body,
      )}
    </>
  )
}
