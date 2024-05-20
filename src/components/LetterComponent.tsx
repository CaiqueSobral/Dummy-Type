type Props = {
  letter: string
  color: 'neutral' | 'hit' | 'wrong'
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
      className={'w-[15px] font-mono font-medium text-[24px]'}
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
    </span>
  )
}
