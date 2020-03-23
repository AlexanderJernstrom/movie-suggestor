import React from "react";

interface TextProps {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Textbox: React.FC<TextProps> = props => {
  return (
    <div>
      <input
        style={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "1px solid DodgerBlue",
          width: "auto",
          outline: "none"
        }}
        placeholder={props.placeholder}
        onChange={e => props.onChange(e)}
      />
    </div>
  );
};

export default Textbox;
