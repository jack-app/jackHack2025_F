import React from "react";

// グラフに表示する用の簡易的なデータ
export type PieData = {
  id: string;
  name: string;
  value: number;
};

const Card: React.FC<PieData> = (props) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* コンポーネントの内容をここに記述 */}
        <img src="/globe.svg" alt="" style={{ width: "45px" }} />
        <p style={{ color: "black", fontSize: "30px", marginLeft: "10px" }}>
          {props.name}
        </p>
        <p style={{ fontSize: "30px", textAlign: "right", marginLeft: "80px" }}>
          {props.value}
        </p>
      </div>
      <a
        href={"/detail/" + props.id}
        style={{ color: "gray", marginLeft: "280px", fontSize: "20px" }}
      >
        詳細ページへ
      </a>
      <p style={{ border: "0.5px solid" }}></p>
    </div>
  );
};

export default Card;
