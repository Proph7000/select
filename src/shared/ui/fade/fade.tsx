import { ReactNode, useRef } from 'react'
import { Transition } from 'react-transition-group'

interface IProps {
  in: boolean
  children: ReactNode
  timeout?: number
  unmountOnExit?: boolean
}

const DURATION = 300

const DEFAULT_STYLE = {
  transition: `opacity ${DURATION}ms ease`,
  opacity: 0,
  height: 0,
  overflow: 'hidden',
}

const TRANSITION_STYLES = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
} as const

export function Fade({
  in: inProp,
  children,
  timeout = DURATION,
  unmountOnExit = false,
}: IProps) {
  const nodeRef = useRef<HTMLDivElement>(null)

  return (
    <Transition
      nodeRef={nodeRef}
      in={inProp}
      timeout={timeout}
      mountOnEnter={unmountOnExit}
      unmountOnExit={unmountOnExit}
    >
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            flexShrink: 0,
            ...DEFAULT_STYLE,
            ...TRANSITION_STYLES[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  )
}
