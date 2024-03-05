import { FormEvent } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { fetchCreaturesData } from "../../../redux/reducers/creaturesSlice";
import Button from "../../Library/Button";
import Dialog from "../../Library/Dialog";
import Input from "../../Library/Input";
import CreatureRow from "../../Modals/CreaturesModal/CreatureRow";

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}


export default function CreaturesDialog({ open, setOpen }: Props) {
  const creatures: Creature[] = useAppSelector(fetchCreaturesData);

  const handleCreatureSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  
  return (
    <Dialog
      title="Creatures"
      open={open}
      setOpen={setOpen}
      className="creatures-dialog"
      height="28rem"
      width="23rem"
    >
      <div className="creatures-dialog__filters">
        <label>
          <select>
            <option value="all">All creatures</option>
            <option value="standard">Standard</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        <form onSubmit={(e) => handleCreatureSearch(e)}>
          <Input
            variant={['search', 'small']}
            placeholder="goblin"
          >
            <Button type="submit" variant={['search', 'small']}>Search</Button>
          </Input>
        </form>
        <Button>New Creature</Button>
      </div>
      <div className="creatures-dialog__list">
        {creatures.map((creature: Creature, i) => {
          return <CreatureRow key={i} creature={creature} />;
        })}
      </div>
    </Dialog>
  );
}
