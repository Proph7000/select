import { useEffect, useId, useRef, useState } from 'react'

import { useWindowResizeObserver } from '@shared/hooks'

import {
  IInputWrapperMeasurements,
  ISelectOption,
  ISelectProps,
} from '../model'

import { SelectInput, SelectOptions } from './components'

export function Select({
  options,
  value,
  onChange,
  autoComplete,
  placeholder,
  label,
  disabled,
  autoFocus,
  onOpen,
  onClose,
  open,
  onBlur,
  onFocus,
  selectClassName,
  selectOptionsClassName,
  selectStyles,
  selectOptionsStyles,
  fullWidth,
  selectRef,
  optionsPosition,
  visibleItems,
  id,
}: ISelectProps) {
  const selectInputId = useId()
  const selectInputWrapperRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [selectedValue, setSelectedValue] = useState<ISelectOption | null>(
    value || null,
  )

  const [inputWrapperPosition, setInputWrapperPosition] =
    useState<IInputWrapperMeasurements>({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    })

  const handleInputWrapperPosition = () => {
    if (selectInputWrapperRef.current) {
      setInputWrapperPosition({
        top: selectInputWrapperRef.current.offsetTop,
        left: selectInputWrapperRef.current.offsetLeft,
        width: selectInputWrapperRef.current.offsetWidth,
        height: selectInputWrapperRef.current.offsetHeight,
      })
    }
  }

  useWindowResizeObserver(handleInputWrapperPosition)

  const handleOpen = () => {
    setIsOpen(true)

    onOpen?.()
  }

  const handleClose = () => {
    setIsOpen(false)

    onClose?.()
  }

  const handleClickInput = () => {
    if (disabled) {
      return
    }

    if (open !== undefined) {
      open ? handleClose() : handleOpen()

      return
    }

    isOpen ? handleClose() : handleOpen()
  }

  useEffect(() => {
    selectedValue && onChange?.(selectedValue)
  }, [selectedValue, onChange])

  return (
    <>
      <SelectInput
        selectStyles={selectStyles}
        fullWidth={fullWidth}
        selectRef={selectRef}
        label={label}
        id={id}
        onBlur={onBlur}
        onFocus={onFocus}
        handleClickInput={handleClickInput}
        selectInputId={selectInputId}
        selectInputWrapperRef={selectInputWrapperRef}
        open={open || isOpen}
        isOpen={isOpen || !!open}
        selectedValue={selectedValue}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        selectClassName={selectClassName}
      />

      <SelectOptions
        open={isOpen || !!open}
        onClose={handleClose}
        inputWrapperPosition={inputWrapperPosition}
        options={options}
        optionsPosition={optionsPosition}
        selectOptionsClassName={selectOptionsClassName}
        selectOptionsStyles={selectOptionsStyles}
        visibleItems={visibleItems}
        onChange={setSelectedValue}
        selectedValue={selectedValue}
        selectInputWrapperRef={selectInputWrapperRef}
      />
    </>
  )
}
