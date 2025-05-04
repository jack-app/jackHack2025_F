"use client";

import React from "react";
import { useState } from "react";

type CardProps = {
  name: string;
  price: number;
  iconURL: string;
  subscId: number;
};

const subsc_sample_data: CardProps[] = [
  {
    name: "Netflix",
    price: 1500,
    iconURL:
      "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
    // iconURL: "https://about.netflix.com/images/logo.png",
    subscId: 1,
  },
  {
    name: "Netflix",
    price: 1600,
    // iconURL: "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
    iconURL: "https://about.netflix.com/images/logo.png",
    subscId: 1,
  },
  {
    name: "amazon prime",
    price: 12345,
    iconURL: "https://m.media-amazon.com/images/I/31W9hs7w0JL.png",
    subscId: 2,
  },
  {
    name: "あああ ああああああああ あああああああああああ",
    price: 1234567,
    iconURL: "https://m.media-amazon.com/images/I/31W9hs7w0JL.png",
    subscId: 3,
  },
  {
    name: "Apple Music",
    price: 1300,
    iconURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6AF8PI2Bu_y_6UsjeZubRMUTKmqgvQ8X7LkGmpLB_dnHNoD3q7H9BAtc&usqp=CAE&s",
    subscId: 4,
  },
  {
    name: "YouTube Premium",
    price: 2000,
    iconURL:
      "https://www.musicman.co.jp/wp-content/uploads/2025/01/a574a2288d048cfcfbfa05989c12c9bb.jpg",
    subscId: 5,
  },
];

// 1つのサブスクのカード
const Card: React.FC<CardProps> = (props) => {
  return (
    <a
      href={"/subscription/" + props.subscId}
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
        textDecoration: "none",
      }}
    >
      {/* アイコン部分 */}
      <div
        style={{ padding: "10px", width: "40%", textAlign: "center", flex: 4 }}
      >
        <img
          src={props.iconURL}
          alt={`${props.name} icon`}
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
        <span
          style={{
            fontSize: props.name.length <= 20 ? 24 : 20,
            wordBreak: "break-word",
          }}
        >
          {props.name}
        </span>

        <span
          style={{
            fontSize: "20px",
            textDecorationLine: "underline",
            display: "block",
          }}
        >
          &yen;{props.price.toLocaleString()}
        </span>
      </div>
    </a>
  );
};

type Props = {};

// 登録しているサブスク一覧
const SubscriptionList: React.FC<Props> = (props) => {
  const [sortOption, setSortOption] = useState<string>();

  const sortedSubscList = (() => {
    if (sortOption === "") return subsc_sample_data;
    if (sortOption === "costHi")
      return subsc_sample_data.sort((a, b) => b.price - a.price);
    if (sortOption === "costLow")
      return subsc_sample_data.sort((a, b) => a.price - b.price);
    return subsc_sample_data;
  })();

  return (
    <div>
      <div
        className="container"
        style={{ maxWidth: "330px", margin: "0 auto", padding: "0 16px" }}
      >
        <div style={{ height: "50px" }}></div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* 並び替え */}
          <div>
            <label>並び替え: </label>
            <select
              name="sort"
              id="sort"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">登録順</option>
              <option value="freqHi">使用頻度(高い順)</option>
              <option value="freqLow">使用頻度(低い順)</option>
              <option value="costHi">金額(高い順)</option>
              <option value="costLow">金額(低い順)</option>
            </select>
          </div>

          {/* 登録件数 */}
          <div>
            <span style={{ fontSize: "20px" }}>
              全{subsc_sample_data.length}件
            </span>
          </div>
        </div>

        {/* 一覧のカード */}
        {sortedSubscList.map((info, idx) => (
          <Card {...info} key={idx} />
        ))}
      </div>

      {/* 登録追加ボタン */}
      <a
        href="/subscription/register"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          width: "70px",
          height: "70px",
          backgroundColor: "#3C6E71",
          color: "white",
          borderRadius: "50%",
          textDecoration: "none",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 45,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          position: "fixed",
          bottom: "36px",
          right: "20px",
        }}
      >
        +
      </a>
    </div>
  );
};

export default SubscriptionList;
