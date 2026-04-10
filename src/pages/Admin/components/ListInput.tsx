import { useState } from "react";

type PillType = "pills" | "image-preview";

export interface ListInputProps {
  label: string;
  id: string;
  formValue: string[];
  type?: PillType;
  handlePillsChange: (name: string, value: string[]) => void;
}

export const ListInput = ({ label, id, formValue, type, handlePillsChange }: ListInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const name = id;

  const handleRemovePill = (index: number) => {
    const newValues = [...formValue];
    newValues.splice(index, 1);
    handlePillsChange(name, newValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.includes(",") && value.at(-1) !==",") {
      const values = value.split(",");
      handlePillsChange(name, [...formValue, ...values]);
      setInputValue("");
    } else if (value.at(-1) ===",") {
      if (value.slice(0, -1).trim() === "") return;
      handlePillsChange(name, [...formValue, value.slice(0, -1)]);
      setInputValue("");
    } else {
      setInputValue(value);
    }
  };

  const pillType: Record<PillType, React.ReactNode> = {
    "pills": <Pills formValue={formValue} handleRemovePill={handleRemovePill} />,
    "image-preview": <ImagePreview formValue={formValue} handleRemovePill={handleRemovePill} />
  }



  return (
    <div className="input-group">
      <label htmlFor={id}>{label} (comma separated)</label>

      <div className="pills-input-wrapper">
        {(formValue.length > 0) &&
          pillType[type || "pills"]
        }

        <input id={id} name={name} value={inputValue} onChange={(e) => handleChange(e)} />
      </div>
    </div>
  )
}

interface PillsProps {
  formValue: string[];
  handleRemovePill: (index: number) => void;
}

const Pills = ({formValue, handleRemovePill}: PillsProps) => {
  return (
    <div className="pills-container">
          {formValue.map((pill, index) => (
            <div key={index} className="pill">
              <span>{pill}</span>
              <button className="pill-remove-btn" type="button" onClick={() => handleRemovePill(index)}>
                &times;
              </button>
            </div>
          ))}
    </div>
    
  )
}

const ImagePreview = ({formValue, handleRemovePill}: PillsProps) => {
  return (
    <div className="image-preview-container">
      {formValue.map((imageUrl, index) => (
            <div key={imageUrl} className="image-pill">
              <img className="preview-image" src={imageUrl} alt={`preview-${index}`} />
              <button className="image-remove-btn" type="button" onClick={() => handleRemovePill(index)}>
                &times;
              </button>
            </div>
          ))}
    </div>
  )
}


