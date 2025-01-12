interface Props {
  title?: string
  data: string[]
  placeholder?: string
}


export default function ListDisplay({ title, data, placeholder }: Props) {
  return (
    <div className="list-display">
      <p>{ title }</p>
      <ul>
        {data.length === 0 && <li className="list-display__placeholder">{ placeholder ? placeholder : '‎' }</li>}
        {data.map((row, i) => {
          return <li key={i}>{ row }</li>;
        })}
      </ul>
    </div>
  );
}
