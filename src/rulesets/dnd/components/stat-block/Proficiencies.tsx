import ListDisplay from "@/components/ListDisplay";
import { memo, useLayoutEffect, useState } from "react";

interface Props {
  proficiencies: Prof_Dnd
}


function Proficiencies({ proficiencies }: Props) {
  const [listData, setListData] = useState<string[]>([]);

  useLayoutEffect(() => {
    const weapons = proficiencies.weapons.map((p) => p.name).join(', ');
    const armor = proficiencies.armor.map((p) => p.name).join(', ');
    const tools = proficiencies.tools.map((p) => p.name).join(', ');
    const instruments = proficiencies.instruments.map((p) => p.name).join(', ');
    const vehicles = proficiencies.vehicles.map((p) => p.name).join(', ');
    setListData([
      weapons ? `<strong>WEAPONS:</strong> ${weapons}` : '',
      armor ? `<strong>ARMOR:</strong> ${armor}` : '',
      tools ? `<strong>TOOLS:</strong> ${tools}` : '',
      instruments ? `<strong>INSTRUMENTSONS:</strong> ${instruments}` : '',
      vehicles ? `<strong>VEHICLES:</strong> ${vehicles}` : '',
    ].filter((p) => p));
  }, [proficiencies]);


  return (
    <ListDisplay
      title="Proficiencies"
      rows={listData}
    />
  );
}

export default memo(Proficiencies);
