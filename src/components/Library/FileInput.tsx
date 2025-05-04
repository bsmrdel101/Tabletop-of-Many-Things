import { generateClasses, parseClasses } from "@/scripts/tools/utils";
import { useState } from "react";

interface Props {
  className?: string
  labelClass?: string
  variants?: ('')[]
  label?: string
  defaultImg?: string
  accept?: string
  onChange?: (files: FileList) => void
  multiple?: boolean
}


export default function FileInput({ className = '', labelClass = '', variants = [], label, defaultImg, accept, onChange, multiple = false, ...props }: Props) {
  const [previewImg, setPreviewImg] = useState(defaultImg ?? '');
  const labelClassList = variants.filter((v) => v.includes('label'));
  const classes = generateClasses(className, variants ? variants.filter((v) => !labelClassList.includes(v)) : [], 'file-input');
  const labelClasses = generateClasses(labelClass, labelClassList, 'file-input');

  
  return (
    <label {...parseClasses(labelClasses)}>
      { label }
      <div className="file-input__add-container">
        <p className="file-input__add">+</p>
        <img src={previewImg} alt="" onError={(e) => e.currentTarget.style.display='none'} />
      </div>

      <input
        autoComplete="off"
        {...parseClasses(classes)}
        {...props}
        onChange={(e) => {
          setPreviewImg(e.target.files ? URL.createObjectURL(e.target.files[0]) : '');
          if (onChange && e.target.files) onChange(e.target.files);
        }}
        type="file"
        multiple={multiple}
      />
    </label>
  );
}
