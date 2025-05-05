import React from "react";
import { Label } from "recharts";
import { InputType } from "zlib";

type Props = {
  // Propsの型をここに定義
};

const inputWithLabel: React.FC<Props> = (props) => {
  return (
    <div style={{ display: "block", paddingTop: "60px" }}>
      <label style={{ fontSize: "30px" }}>
        サブスク名
        <br />
        <input type="text" style={{ fontSize: "20px" }} />
      </label>
      <br />
      <br />
      <br />
      <label style={{ fontSize: "30px" }}>
        {" "}
        支払い頻度
        <br />
        <select style={{ fontSize: "20px" }}>
          {" "}
          <option value="1">１か月</option>
          <option value="2">３か月</option>
          <option value="3">６か月</option>
          <option value="1">１２か月</option>
        </select>
      </label>
      <br />
      <br />
      <br />
      <label style={{ fontSize: "30px" }}>
        金額（円）
        <br />
        <input type="number" style={{ fontSize: "20px" }} />
      </label>
      <br />
      <br />
      <br />
      <label style={{ fontSize: "30px" }}>
        {" "}
        利用頻度
        <br />
        <select style={{ fontSize: "20px" }}>
          {" "}
          <option value="1">毎日</option>
          <option value="2">週に数回</option>
          <option value="3">一か月に数回</option>
          <option value="1">一年に数回</option>
        </select>
      </label>
    </div>
  );
};

export default inputWithLabel;
