type Props = {
  className: string
  index: number
}

export default function Pipe(props: Props) {
  return (
    <div
      className={props.className}
      style={{
        left: props.index * 15 + (props.index === 0 ? -4 : 4 * props.index),
      }}
    />
  )
}
