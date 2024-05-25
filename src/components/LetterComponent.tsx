import type { colorType } from '@/types/color'
import Pipe from './PipeComponent'

type Props = {
  letter: string
  color: colorType
  showPipe: boolean
}

function colorMapper(color: string) {
  if (color === 'neutral') return '#646669'
  if (color === 'hit') return '#d4d4d4'
  return '#f87171'
}

export default function RenderLetter(props: Props) {
  const color = colorMapper(props.color)
  return (
    <span
      className={
        'w-[15px] font-mono font-medium text-[24px] relative flex items-center'
      }
      style={{ color: color }}
    >
      {props.letter === ' ' ? (
        props.color === 'wrong' ? (
          '_'
        ) : (
          <span className="w-[15px]">&nbsp;</span>
        )
      ) : (
        props.letter
      )}
      {props.showPipe && <Pipe />}
    </span>
  )
}
