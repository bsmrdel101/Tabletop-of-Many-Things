import Select from "./Select";

interface Props extends Omit<SelectHTML, 'onChange'> {
  className?: string
  labelClass?: string
  variants?: ('label-thin' | 'fit')[]
  onChange?: (value: Ruleset | '') => void
}


export default function RulesetSelect5e({ className = '', labelClass = '', variants = [], onChange, ...props }: Props) {
  return (
    <Select
      label="Ruleset"
      variants={variants}
      className={className}
      labelClass={labelClass}
      onChange={(e) => onChange?.(e.target.value as Ruleset | '')}
      {...props as SelectHTML}
    >
      <option value="">-- SELECT --</option>
      <option value="5e">D&D 5E</option>
      <option value="2024" disabled>D&D 5.5E</option>
    </Select>
  );
}
