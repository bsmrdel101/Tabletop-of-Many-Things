interface Props {
  title?: string
  rows: string[]
}


export default function ListDisplay({ title, rows }: Props) {
  return (
    <div className="list-display">
      <p className="list-display__title">{ title }</p>
      <div className="list-display__content">
        {rows.map((row: string, i) => {
          return (
            <p key={i} className="list-display__row" dangerouslySetInnerHTML={{ __html: row }} />
          );
        })}
      </div>
    </div>
  );
}
