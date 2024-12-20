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
          <Button variants={['brown', 'hover-scale']} onClick={() => toggleMenu('maps')}>
            Maps
          </Button>
          <Button variants={['brown', 'hover-scale']} onClick={() => toggleMenu('assets')}>
            Assets
          </Button>
          <Button variants={['brown', 'hover-scale']} onClick={() => setCreaturesModalOpen(!creaturesModalOpen)}>
            Creatures
          </Button>
          <Button variants={['brown', 'hover-scale']}>
            Encounters
          </Button>
          <Button variants={['brown', 'hover-scale']}>
            Loot
          </Button>
          <Button variants={['brown', 'hover-scale']}>
            Items
          </Button>
          <Button variants={['brown', 'hover-scale']}>
            Shops
          </Button>
        </>
        :
        <>
          <Button variants={['brown', 'hover-scale']}>
            Characters
          </Button>
          <Button variants={['brown', 'hover-scale']}>
            Character Sheet
          </Button>
        </>
      }
    </div>
  );
}
