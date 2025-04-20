interface Props {
  msg: string
}


export default function Error({ msg }: Props) {
  return (
    <>
      {msg &&
        <div className="error">
          <p>{ msg }</p>
        </div>
      }
    </>
  );
}
