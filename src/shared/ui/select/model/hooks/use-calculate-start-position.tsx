import { useState, useCallback, useEffect } from 'react'

import { SELECT_CLASS_NAMES } from '../constants'
import { IInputWrapperMeasurements, IOptionsPosition } from '../types'

interface IUseCalculateStartPositionProps {
  presentationElement: HTMLDivElement | null
  inputWrapperPosition: IInputWrapperMeasurements
  optionsPosition?: IOptionsPosition
  gap: number
  open: boolean
}

export function useCalculateStartPosition({
  presentationElement,
  inputWrapperPosition,
  optionsPosition,
  gap,
  open,
}: IUseCalculateStartPositionProps) {
  const [startPosition, setStartPosition] = useState<number>(0)

  const getStartPosition = useCallback(() => {
    if (!presentationElement) {
      return
    }

    const optionList = presentationElement.querySelector(
      `.${SELECT_CLASS_NAMES.options}`,
    ) as HTMLElement

    if (!optionList) {
      return
    }

    let startPosition =
      inputWrapperPosition.top + gap + inputWrapperPosition.height

    if (optionsPosition?.position === 'bottom') {
      setStartPosition(startPosition)

      return
    }

    if (
      optionsPosition?.position === 'top' ||
      startPosition + optionList.offsetHeight > presentationElement.offsetHeight
    ) {
      startPosition = inputWrapperPosition.top - optionList.offsetHeight - gap
    }

    setStartPosition(startPosition)
  }, [inputWrapperPosition, optionsPosition, gap, presentationElement])

  useEffect(() => {
    open && getStartPosition()
  }, [open, getStartPosition])

  return startPosition
}
