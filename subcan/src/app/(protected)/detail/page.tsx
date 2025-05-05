"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getSubscription } from "@/libs/firestore";
import { Subscription } from "@/types/Subscriptions";
import { useSession } from "next-auth/react";

type Props = {
  subsc_id: string;
};

const SubscriptionDetail = ({ subsc_id }: Props) => {
  const [info, setInfo] = useState<Subscription | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.uid && subsc_id) {
      getSubscription(session.user.uid, subsc_id).then(
        (data) => {
          setInfo(data);
          setIsLoading(false);
        },
        (err) => {
          console.error(err);
          setIsLoading(false);
        }
      );
    }
  }, [session?.user?.uid, subsc_id]);

  if (isLoading) return <div>読み込み中...</div>;
  if (!info) return <div>情報が見つかりません。</div>;

  const stringFrequency = (frequency: number) => {
    if (frequency === 0) return "毎日";
    if (frequency === 1) return "週に数回";
    if (frequency === 2) return "月に数回";
    if (frequency === 3) return "年に数回";
    if (frequency === 4) return "使用していない";
    return "不明";
  };

  const caluculateNextPaymentDate = (
    paymentStartsAt: Date,
    paymentPeriod: string
  ): Date => {
    const startDate = new Date(paymentStartsAt);
    const period = paymentPeriod.split("days")[0];
    const nextPaymentDate = new Date(startDate);
    nextPaymentDate.setDate(startDate.getDate() + parseInt(period));
    return nextPaymentDate;
  };

  const basicInfo = [
    { label: "金額", value: info.fee ?? "未登録" },
    { label: "次の引き落とし日", value: caluculateNextPaymentDate ?? "未登録" },
    { label: "最後の支払い日", value: info.lastPaymentDate ?? "未登録" },
    { label: "利用頻度", value: stringFrequency(info.frequency) ?? "未登録" },
  ];

  // const firstInfo = [{ label: "登録日", value: info.created_at ?? "不明" }];

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      {/* サブスクヘッダー */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#bff4a6",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            backgroundColor: "#e06c6c",
            borderRadius: "12px",
            marginRight: "16px",
            border: "4px solid #5b9f8a",
          }}
        />
        <div
          style={{
            fontSize: "24px",
            color: "white",
            backgroundColor: "#3b5b63",
            padding: "8px 16px",
            borderRadius: "8px",
          }}
        >
          {info.name}
        </div>
      </div>

      {/* 解約ボタン */}
      <Link href={info.cancel_url ?? "#"}>
        <button
          style={{
            width: "100%",
            padding: "10px",
            margin: "12px 0",
            border: "2px solid #333",
            borderRadius: "10px",
            background: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          解約ページへ
        </button>
      </Link>

      {/* 基本情報 */}
      <InfoTable title="基本情報" items={basicInfo} />
      {/* <InfoTable title="最初に登録した情報" items={firstInfo} /> */}

      {/* 情報の修正ボタン */}
      <div
        style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}
      >
        <Link href={`/edit`}>
          <button
            style={{
              padding: "10px 24px",
              border: "2px solid #3b5b63",
              borderRadius: "10px",
              background: "white",
              color: "#3b5b63",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            情報の修正
          </button>
        </Link>
      </div>
    </div>
  );
};

const InfoTable = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string }[];
}) => (
  <div
    style={{
      marginTop: "16px",
      background: "#fff",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "12px",
    }}
  >
    <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>{title}</h2>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        {items.map((item) => (
          <tr key={item.label}>
            <th style={thStyle}>{item.label}</th>
            <td style={tdStyle}>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const thStyle = {
  padding: "8px",
  textAlign: "left" as const,
  borderBottom: "1px solid #eee",
  fontWeight: "normal",
};

const tdStyle = {
  padding: "8px",
  borderBottom: "1px solid #eee",
};

export default SubscriptionDetail;
