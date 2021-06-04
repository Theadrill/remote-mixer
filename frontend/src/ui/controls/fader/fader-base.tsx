import { css } from '@linaria/core'
import { ReactNode, useRef } from 'react'
import { ensureBetween } from '@remote-mixer/utils'

import { Touchable } from '../../components/touchable'
import { getTouchEventOffset } from '../../../util/touch'
import { cx } from '../../../util/styles'
import { baseline, iconShade, baselinePx } from '../../styles'

export const faderWidth = baselinePx * 12
export const faderHeight = baselinePx * 60
export const trackWidth = faderWidth / 3
export const trackHeight = faderHeight - faderWidth
export const trackMargin = (faderWidth - trackWidth) / 2
export const trackOffset = (faderHeight - trackHeight) / 2

const faderBase = css`
  position: relative;
  flex: 0 0 auto;
  width: ${faderWidth}px;
  height: ${faderHeight}px;
  margin: ${baseline(1.5)};
`

const track = css`
  position: absolute;
  top: ${trackOffset}px;
  left: ${trackMargin}px;
  background: ${iconShade(3)};
  width: ${trackWidth}px;
  height: ${trackHeight}px;
`

const meterTrack = css`
  background: ${iconShade(1)};
  top: auto;
  bottom: ${trackOffset}px;
  height: 0;
  will-change: height;
  transition: height 0.1s ease-out;
`

export interface FaderBaseProps {
  className?: string
  onTouch?: (fraction: number) => void
  onUp?: () => void
  children?: ReactNode
  meterRef?: React.RefObject<HTMLDivElement>
}

export function FaderBase({
  className,
  onTouch,
  onUp,
  children,
  meterRef,
}: FaderBaseProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <Touchable
      className={cx(faderBase, className)}
      onTouch={event => {
        const offset = getTouchEventOffset(event, trackRef)
        if (!offset) {
          return
        }
        const fraction = ensureBetween(1 - offset.yFraction, 0, 1)
        onTouch?.(fraction)
      }}
      onUp={onUp}
    >
      <div className={track} ref={trackRef} />
      {meterRef && <div className={cx(track, meterTrack)} ref={meterRef} />}
      {children}
    </Touchable>
  )
}
