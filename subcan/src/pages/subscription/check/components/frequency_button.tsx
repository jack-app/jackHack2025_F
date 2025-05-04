import { Kosugi_Maru } from "next/font/google";
import React from "react";

type Props = {
  // Propsの型をここに定義
  content: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const FrequencyButton: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: 30,
      }}
    >
      <button
        value={props.content}
        style={{
          textAlign: "center",
          backgroundColor: "white",
          color: "#3C6E71",
          borderColor: "#3C6E71",
          borderRadius: 10,
          width: 250,
          height: 50,
          fontSize: 30,
        }}
        onClick={props.handleClick}
      >
        {props.content}
      </button>
    </div>
  );
};

export default FrequencyButton;
