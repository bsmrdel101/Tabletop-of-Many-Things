interface Props {
  name: string;
  onClick: any;
}

export default function Folder({ name, onClick }: Props) {
  return (
    <div className="folder" onClick={() => onClick(name)}>
      <img src="/images/folder.png" alt="folder image" />
      <p>{ name }</p>
    </div>
  );
}
