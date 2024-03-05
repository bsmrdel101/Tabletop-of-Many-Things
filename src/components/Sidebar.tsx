import { useAtom } from "jotai";
import { toggleMenu } from "../scripts/menuManager";
import Button from "./Library/Button";
import { creaturesDialogAtom } from "../scripts/atoms/dialogs";


interface Props {
  userType: 'dm' | 'player';
}

export default function Sidebar({ userType }: Props) {
  const [creaturesModalOpen, setCreaturesModalOpen] = useAtom(creaturesDialogAtom);


  return (
    <div className="sidebar">
      {userType === 'dm' ?
        <>
          <Button variant={['brown', 'hover-scale']} onClick={() => toggleMenu('maps')}>
            Maps
          </Button>
          <Button variant={['brown', 'hover-scale']} onClick={() => toggleMenu('assets')}>
            Assets
          </Button>
          <Button variant={['brown', 'hover-scale']} onClick={() => setCreaturesModalOpen(!creaturesModalOpen)}>
            Creatures
          </Button>
          <Button variant={['brown', 'hover-scale']}>
            Encounters
          </Button>
          <Button variant={['brown', 'hover-scale']}>
            Loot
          </Button>
          <Button variant={['brown', 'hover-scale']}>
            Items
          </Button>
          <Button variant={['brown', 'hover-scale']}>
            Shops
          </Button>
        </>
        :
        <>
          <Button variant={['brown', 'hover-scale']}>
            Characters
          </Button>
          <Button variant={['brown', 'hover-scale']}>
            Character Sheet
          </Button>
        </>
      }
    </div>
  );
}
