"use client";
import { useSession } from "next-auth/react";
import Card, { PieData } from "./components/Card";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import { getSubscriptionList } from "@/libs/firestore";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// ログインページコンポーネント
export default function GraphPage() {
  const [subscList, setSubscList] = useState<PieData[] | undefined>();

  // uid取得と更新
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.uid) {
      getSubscriptionList(session.user.uid).then(
        (data) => {
          setSubscList(
            data.map((elem) => ({
              id: elem.id,
              name: elem.name,
              value: elem.fee,
            }))
          );
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }, [session?.user?.uid]);

  if (!subscList) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ paddingTop: 40 }}>
      <PieChart width={400} height={400}>
        <Pie
          data={subscList}
          cx={200}
          cy={200}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {subscList.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      {subscList.map((elem) => (
        <Card {...elem} key={elem.id} />
      ))}
    </div>
  );
}
