interface Props {
  title?: string
  rows: string[]
  noStyle?: boolean
  textAlign?: string
}


export default function ListDisplay({ title, rows, noStyle = false, textAlign = 'center' }: Props) {
  if (noStyle) {
    return (
      <div>
        <p><strong>{ title }</strong></p>
        <div style={{ textAlign: textAlign as any }}>
          {rows.map((row: string, i) => {
            return (
              <p key={i} dangerouslySetInnerHTML={{ __html: row }} />
            );
          })}
        </div>
      </div>
    );
  }


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
