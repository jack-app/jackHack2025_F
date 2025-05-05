import { Timestamp } from "firebase-admin/firestore";

export interface Subscription {
  id: string;
  user_id: string; // ユーザーID
  name: string; // サブスク名
  fee: number; // 料金
  payment_starts_at: Timestamp; // 支払い開始日
  payment_period: string; // 支払い期間
  last_payment_date: Timestamp | null; // 最後の支払日
  frequency: number; // ユーザーの利用頻度(値が大きいと頻度が少ない、小さいと頻度が多い)
  icon: string; // アイコンへのパス
  is_trial_period: boolean; // 無料期間か(次の支払日まで無料期間かどうか)
  cancel_url: string | null; // 解約先URL
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface CheckSubscription {
  id: string;
  name: string;
  fee: number;
  icon: string;
}
