// app/[uuid]/page.tsx
import { notFound } from "next/navigation";
import SubscriptionDetail from "@/app/(protected)/detail/page"; // 実際のコンポーネントパスに合わせて調整

interface PageProps {
  params: {
    uuid: string;
  };
}

export default function DetailPage({ params }: PageProps) {
  const { uuid } = params;

  if (!uuid) {
    return notFound(); // データがなければ404
  }

  return <SubscriptionDetail subsc_id={uuid} />;
}
