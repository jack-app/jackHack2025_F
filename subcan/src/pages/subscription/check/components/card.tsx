import { Kosugi_Maru } from "next/font/google";
import React from "react";

type Props = {
  // Propsの型をここに定義
  name: string;
  price: number;
  iconPath: string;
};

const Card: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "solid 1px",
        backgroundColor: "#353535",
        width: "85%",
        minHeight: "130px",
        margin: "15px auto",
        borderRadius: "5px",
        boxShadow: "3px 4px 4px rba(0,0,0,0.25)",
      }}
    >
      {/* アイコン部分 */}
      <div
        style={{
          padding: "10px",
          width: "40%",
          textAlign: "center",
          flex: 4,
        }}
      >
        <img
          src={props.iconPath}
          alt="Netflix icon"
          style={{
            maxWidth: "80%",
            maxHeight: "80%",
            backgroundColor: "white",
          }}
        />
      </div>

      {/* サブスク名・金額部分 */}
      <div
        style={{
          padding: "10px",
          color: "white",
          textAlign: "center",
          flex: 6,
        }}
      >
        <span style={{ fontSize: "24px" }}>{props.name}</span>

        <span
          style={{
            fontSize: "20px",
            textDecorationLine: "underline",
            display: "block",
          }}
        >
          &yen;{props.price}
        </span>
      </div>
    </div>
  );
};

export default Card;
