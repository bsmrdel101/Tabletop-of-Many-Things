interface Props {
  title: string
  onClick?: () => void
  children: any
}


export default function BoxStat({ title, onClick, children }: Props) {
  return (
    <div className="box-stats">
      <p>{ title }</p>
      <div
        style={ onClick ? { cursor: 'pointer' } : {}}
        className="box-stats__content"
        onClick={() => onClick && onClick()}
      >
        { children }
      </div>
    </div>
  );
}
