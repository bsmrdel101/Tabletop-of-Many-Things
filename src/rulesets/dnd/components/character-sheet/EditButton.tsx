import Button from "@/components/library/Button";
import Img from "@/components/library/Img";

interface Props {
  editing: boolean
  setEditing: (value: boolean) => void
}


export default function EditButton({ editing, setEditing }: Props) {
  return (
    <Button
      variants={['empty']}
      className="character-sheet__edit-btn"
      onClick={() => setEditing(!editing)}
    >
      {editing ?
        <Img src="/images/icons/pen-slash.svg" alt="Stop edit button" />
        :
        <Img src="/images/icons/pen.svg" alt="Edit button" />
      }
    </Button>
  );
}
