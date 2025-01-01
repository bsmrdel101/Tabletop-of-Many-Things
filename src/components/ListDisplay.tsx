interface Props {
  title?: string
  data: string[]
}


export default function ListDisplay({ title, data }: Props) {
  return (
    <div className="list-display">
      <p>{ title }</p>
      <ul>
        {data.map((row, i) => {
          return <li key={i}>{ row }</li>;
        })}
      </ul>
    </div>
  );
}
