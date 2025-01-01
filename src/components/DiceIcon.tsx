interface Props {
  type: string
  text?: string
}


export default function DiceIcon({ type, text }: Props) {
  return (
    <div className="dice-icon">
      <img src={`/images/${type}.png`} alt={`${type}`} width={28} />
      <p>{ text }</p>
    </div>
  );
}
