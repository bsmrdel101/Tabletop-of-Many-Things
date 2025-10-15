import Modal from "@/components/library/Modal";
import ClassSelect5e from "@/rulesets/5e/select/ClassSelect5e";

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  classes: Class_5e[]
  onSelect: (c: Class_5e) => void
}


export default function SelectClassModal({ open, setOpen, classes, onSelect }: Props) {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Pick a Class"
    >
      <ClassSelect5e
        classes={classes}
        onChangeClass={onSelect}
      />
    </Modal>
  );
}
