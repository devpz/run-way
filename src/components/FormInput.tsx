import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  defaultValue?: string;
  size?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  defaultValue,
  size,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`}
      />
    </div>
  );
};

export default FormInput;
