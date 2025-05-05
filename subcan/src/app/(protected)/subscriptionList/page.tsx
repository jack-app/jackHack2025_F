"use client";
import { getSubscriptionList } from "@/libs/firestore";
import { Subscription } from "@/types/Subscriptions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";

// 1つのサブスクのカード
const Card: React.FC<Subscription> = (props) => {
  return (
    <a
      href={`/${props.id}`}
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
          src={props.icon}
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
          &yen;{props.fee.toLocaleString()}
        </span>
      </div>
    </a>
  );
};

type Props = {};

// 登録しているサブスク一覧
const SubscriptionList: React.FC<Props> = (props) => {
  const [sortOption, setSortOption] = useState<string>("");
  const [subscList, setSubscList] = useState<Subscription[] | undefined>();

  // uid取得と更新
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.uid) {
      getSubscriptionList(session.user.uid).then(
        (data) => {
          setSubscList(data);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }, [session?.user?.uid]);

  const sortedSubscList = (() => {
    if (!subscList) return [];
    if (sortOption === "")
      return subscList.sort(
        (a, b) => a.created_at.toMillis() - b.created_at.toMillis()
      );
    if (sortOption === "freqHi")
      return subscList.sort((a, b) => a.frequency - b.frequency);
    if (sortOption === "freqLow")
      return subscList.sort((a, b) => b.frequency - a.frequency);
    if (sortOption === "costHi") return subscList.sort((a, b) => b.fee - a.fee);
    if (sortOption === "costLow")
      return subscList.sort((a, b) => a.fee - b.fee);
    return subscList;
  })();

  if (!subscList) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ height: "50px" }} />

      <div
        className="container"
        style={{ maxWidth: "330px", margin: "0 auto", padding: "0 16px" }}
      >
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
            <span style={{ fontSize: "20px" }}>全{subscList.length}件</span>
          </div>
        </div>

        {/* 一覧のカード */}
        {sortedSubscList.map((info, idx) => (
          <Card {...info} key={idx} />
        ))}
      </div>

      {/* 登録追加ボタン */}
      <Link
        href="/register"
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
      </Link>
    </div>
  );
};

export default SubscriptionList;
