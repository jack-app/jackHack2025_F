"use client";
import { Kosugi_Maru } from "next/font/google";
import React, { useEffect, useState } from "react";
import Card from "./components/card";
import FrequencyButton from "./components/frequency_button";
import {
  addExampleSubscription,
  getsubscriptions,
  updateSubscription,
} from "@/libs/firestore";
import { CheckSubscription } from "@/types/Subscriptions";
import Link from "next/link";

type Props = {
  // Propsの型をここに定義
};

const MyComponent: React.FC<Props> = (props) => {
  const [subscriptions, setSubscriptions] = React.useState<CheckSubscription[]>(
    []
  );
  const [listIndex, setListIndex] = React.useState(0);
  const [name, setName] = React.useState("");
  const [fee, setFee] = React.useState(0);
  const [icon, setIcon] = React.useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    let value = Number(event.currentTarget.value) as number;
    setListIndex(listIndex + 1);
    setName(subscriptions[listIndex].name);
    setFee(subscriptions[listIndex].fee);
    setIcon(subscriptions[listIndex].icon);
    updateSubscription(subscriptions[listIndex].id, value);
  };

  useEffect(() => {
    getsubscriptions().then((data: CheckSubscription[]) => {
      setSubscriptions(data);
    });
  }, []);

  useEffect(() => {
    if (subscriptions.length > 0) {
      setName(subscriptions[listIndex].name);
      setFee(subscriptions[listIndex].fee);
      setIcon(subscriptions[listIndex].icon);
    }
  }, [subscriptions]);

  if (subscriptions.length === listIndex) {
    return (
      <div>
        <h2
          style={{
            fontSize: 30,
            marginTop: 200,
            textAlign: "center",
            fontFamily: "Kosugi_Maru",
          }}
        >
          すべて完了しました
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 30,
          }}
        >
          <Link
            href="/subscriptionList"
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
          >
            一覧に戻る
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ paddingTop: "30px" }}>
        {/* コンポーネントの内容をここに記述 */}
        {<Card name={name} price={fee} iconPath={icon} />}
        <div>
          <h1
            style={{
              fontSize: 20,
              marginTop: 30,
              textAlign: "center",
              fontFamily: "Kosugi_Maru",
            }}
          >
            使用頻度を選択してください
          </h1>
        </div>
        <FrequencyButton content={"毎日"} value={0} handleClick={handleClick} />
        <FrequencyButton
          content={"週に数回"}
          value={1}
          handleClick={handleClick}
        />
        <FrequencyButton
          content={"月に数回"}
          value={2}
          handleClick={handleClick}
        />
        <FrequencyButton
          content={"年に数回"}
          value={3}
          handleClick={handleClick}
        />
        <FrequencyButton
          content={"最近使ってない"}
          value={4}
          handleClick={handleClick}
        />
      </div>
    );
  }
};

export default MyComponent;
