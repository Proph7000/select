import { CSSProperties, KeyboardEvent, RefObject } from 'react'

export interface ISelectProps {
  visibleItems?: number
  options: ISelectOption[]
  value?: ISelectOption | null
  onChange?: (value: ISelectOption) => void
  autoComplete?: boolean
  placeholder?: string
  label?: string
  disabled?: boolean
  autoFocus?: boolean
  onOpen?: () => void
  onClose?: () => void
  open?: boolean
  onBlur?: () => void
  onFocus?: () => void
  selectClassName?: string
  selectOptionsClassName?: string
  selectStyles?: CSSProperties
  selectOptionsStyles?: CSSProperties
  fullWidth?: boolean
  selectRef?: RefObject<HTMLInputElement>
  optionsPosition?: IOptionsPosition
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
  id?: string
}

export interface ISelectOption {
  value: string
  label: string
}

export interface IOptionsPosition {
  position?: 'top' | 'bottom'
  gap?: number
}

export interface IInputWrapperMeasurements {
  top: number
  left: number
  width: number
  height: number
}
