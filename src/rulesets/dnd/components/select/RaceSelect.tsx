import Select from "@/components/library/select/Select";
import { gameAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";
import { getRaceById, getSubraceById } from "../../services/racesService";
import { useEffect, useState } from "react";

interface Props extends SelectHTML {
  className?: string
  labelClass?: string
  variants?: ('label-thin' | 'fit')[]
  onChangeRace?: (race: Race_Dnd, subrace: Subrace_Dnd | null) => void
  races: Race_Dnd[]
}


export default function RaceSelect({ className = '', labelClass = '', variants = [], onChangeRace, races, ...props }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);
  const [options, setOptions] = useState<{ race: Race_Dnd, subrace: Subrace_Dnd }[]>([]);

  useEffect(() => {
    const data: { race: Race_Dnd, subrace: Subrace_Dnd }[] = [];
    races.forEach((r) => {
      r.subraces.forEach((s) => data.push({ race: r, subrace: s }));
    });
    setOptions(data);
  }, [races]);
  
  const handleRaceChange = async (data: { raceId: number, subraceId: number }) => {
    const res = await getRaceById(Number(data.raceId));
    if (res && onChangeRace) {
      const subrace = await getSubraceById(Number(data.subraceId));
      onChangeRace(res, subrace ?? null);
    }
  };


  return (
    <Select
      variants={variants}
      className={className}
      labelClass={labelClass}
      onChange={(e) => {
        if (props.onChange) props.onChange(e);
        handleRaceChange(JSON.parse(e.target.value));
      }}
      {...props as SelectHTML}
    >
      <option value="">-- { game?.ruleset === '5e' ? 'RACE' : 'SPECIES' } --</option>
      {options.map((option, i) => {
        return (
          <option key={i} value={JSON.stringify({ raceId: option.race.id, subraceId: option.subrace.id })}>{ option.race.name }{ option.subrace ? ` (${option.subrace.name})` : '' }</option>
        );
      })}
    </Select>
  );
}
