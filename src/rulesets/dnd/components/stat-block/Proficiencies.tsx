import ListDisplay from "@/components/ListDisplay";
import { memo, useLayoutEffect, useState } from "react";

interface Props {
  proficiencies: Prof_Dnd
  noStyle?: boolean
  textAlign?: string
}


function Proficiencies({ proficiencies, noStyle, textAlign }: Props) {
  const [listData, setListData] = useState<string[]>([]);

  useLayoutEffect(() => {
    const weapons = proficiencies.weapons.map((p) => p).join(', ');
    const armor = proficiencies.armor.map((p) => p).join(', ');
    const tools = proficiencies.tools.map((p) => p).join(', ');
    const instruments = proficiencies.instruments.map((p) => p).join(', ');
    const vehicles = proficiencies.vehicles.map((p) => p).join(', ');
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
      noStyle={noStyle}
      textAlign={textAlign}
    />
  );
}

export default memo(Proficiencies);
