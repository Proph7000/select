import clsx from 'clsx'
import { CSSProperties, PropsWithChildren, RefObject } from 'react'

import './presentation.css'

interface IProps {
  onClick?: () => void
  className?: string
  style?: CSSProperties
  ref?: RefObject<HTMLDivElement | null>
}

export function Presentation({
  children,
  onClick,
  className,
  style,
  ref,
}: PropsWithChildren<IProps>) {
  return (
    <div
      className={clsx('presentation', className)}
      style={style}
      onClick={onClick}
      role='presentation'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClick?.()
        }
      }}
      ref={ref}
    >
      {children}
    </div>
  )
}
