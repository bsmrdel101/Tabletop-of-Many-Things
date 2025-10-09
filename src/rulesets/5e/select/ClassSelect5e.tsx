import Select from "@/components/library/select/Select";
import { getClassById } from "../services/classesService";

interface Props extends SelectHTML {
  className?: string
  labelClass?: string
  variants?: ('label-thin' | 'fit')[]
  onChangeClass?: (c: Class_5e) => void
  classes: Class_5e[]
}


export default function ClassSelect5e({ className = '', labelClass = '', variants = [], onChangeClass, classes, ...props }: Props) {
  const handleClassChange = async (id: number) => {
    const res = await getClassById(id);
    if (res && onChangeClass) onChangeClass(res);
  };


  return (
    <Select
      label="Class"
      variants={variants}
      className={className}
      labelClass={labelClass}
      onChange={(e) => {
        if (props.onChange) props.onChange(e);
        handleClassChange(Number(e.target.value));
      }}
      {...props as SelectHTML}
    >
      <option>-- CLASS --</option>
      {classes.map((c) => {
        return (
          <option key={c.id} value={c.id}>{ c.name }</option>
        );
      })}
    </Select>
  );
}
