type Props = {
  letter: string
  color: 'neutral' | 'green' | 'red'
}

function colorMapper(color: string) {
  if (color === 'neutral') return '#d4d4d4'
  if (color === 'green') return '#86efac'
  return '#fca5a5'
}

export default function RenderLetter(props: Props) {
  const color = colorMapper(props.color)
  return (
    <span
      className={'w-[15px] font-mono font-medium text-[24px]'}
      style={{ color: color }}
    >
      {props.letter === ' ' ? (
        props.color === 'red' ? (
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
