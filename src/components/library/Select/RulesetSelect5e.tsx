import Select from "./Select";

interface Props extends SelectHTML {
  className?: string
  labelClass?: string
  variants?: ('label-thin' | 'fit')[]
}


export default function RulesetSelect5e({ className = '', labelClass = '', variants = [], ...props }: Props) {
  return (
    <Select
      label="Ruleset"
      variants={variants}
      className={className}
      labelClass={labelClass}
      {...props}
    >
      <option value="5e">D&D 5E</option>
      <option value="2024" disabled>D&D 2024</option>
      <option value="sw" disabled>Star Wars (Fantasy Flight)</option>
    </Select>
  );
}
