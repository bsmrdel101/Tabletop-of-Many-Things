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
      <option value="5e">D&D 5E (2014)</option>
      <option value="2024">D&D 5E (2024)</option>
    </Select>
  );
}
