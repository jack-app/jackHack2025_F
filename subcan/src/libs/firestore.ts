import { subscribe } from "diagnostics_channel";
import { db } from "./firebase";
import { Subscription } from "@/types/Subscriptions";
import { CheckSubscription } from "@/types/Subscriptions";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";

// FireStoreを操作する関数はここに書く

// データの追加
export const addUser = async (name: string, email: string) => {
  const docRef = await addDoc(collection(db, "users"), {
    name,
    email,
    created_at: new Date(),
  });
  return docRef.id;
};

export const addExampleSubscription = async () => {
  const docRef = await addDoc(collection(db, "example_subscription"), {
    name: "Amazonprime",
    fee: 600,
    period: "30days",
    payment_period: "30days",
    icon: "",
    trial_period: "30days",
  });
  return docRef.id;
};

// データの取得
export const getUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    email: doc.data().email,
    created_at: doc.data().createdAt,
  }));
};

export const getsubscriptions = async (): Promise<CheckSubscription[]> => {
  const snapshot = await getDocs(collection(db, "subscriptions"));
  snapshot.docs.map((doc) => console.log(doc.data()));
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        name: doc.data().name,
        fee: doc.data().fee,
        icon: doc.data().icon,
      } as CheckSubscription)
  );
};

export const updateSubscription = async (id: string, value: number) => {
  await setDoc(doc(db, "example_subscription", id), {
    frequency: value,
  });
};

// サブスクデータの追加
export const addSubscriptionInfo = async (new_subsc: Subscription) => {
  const docRef = await addDoc(collection(db, "subscriptions"), {
    ...new_subsc,
    // user_id: "jzsIxKYebKRTAxp0BxVCqfigRWy1",
    // name: "YouTube Premium",
    // fee: 2000,
    // payment_starts_at: new Date("2025-05-20"), // 支払開始日
    // payment_period: "30days", // 支払期間
    // last_payment_date: null, // 最後の支払日
    // frequency: 0, // ユーザーの利用頻度
    // icon: "https://www.musicman.co.jp/wp-content/uploads/2025/01/a574a2288d048cfcfbfa05989c12c9bb.jpg", // icon
    // is_trial_period: false, // 無料期間
    // cancel_url: "https://google.com", // 解約先URL
    // created_at: new Date(),
    // updated_at: new Date(),
  });
  return docRef.id;
};

export const getSubscriptionList = async (
  uid: string
): Promise<Subscription[]> => {
  const snapshot = await getDocs(
    query(collection(db, "subscriptions"), where("user_id", "==", uid))
  );
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Subscription)
  );
};

// 1つのサブスクのデータを取得
export const getSubscription = async (
  uid: string,
  id: string
): Promise<Subscription | undefined> => {
  const snapshot = await getDoc(doc(db, "subscriptions", id));
  if (snapshot.exists() && snapshot.data().user_id === uid)
    return { id: snapshot.id, ...snapshot.data() } as Subscription;
  return undefined;
};

export const getSubscriptionsById = async (uid: string) => {
  const snapshot = await getDocs(
    query(collection(db, "subscriptions"), where("user_id", "==", uid))
  );
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    fee: doc.data().fee,
    payment_starts_at: doc.data().payment_starts_at,
    payment_period: doc.data().payment_period,
    last_payment_date: doc.data().last_payment_date,
    frequency: doc.data().frequency,
    icon: doc.data().icon,
    is_trial_period: doc.data().is_trial_period,
    cancel_url: doc.data().cancel_url,
  }));
};
