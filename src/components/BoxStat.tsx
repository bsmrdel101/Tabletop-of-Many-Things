interface Props {
  title: string
  onClick?: () => void
  children: any
}


export default function BoxStat({ title, onClick, children }: Props) {
  return (
    <div className="box-stat">
      <p className="box-stat__title">{ title }</p>
      <div
        style={ onClick ? { cursor: 'pointer' } : {}}
        className="box-stat__content"
        onClick={() => onClick && onClick()}
      >
        { children }
      </div>
    </div>
  );
}
