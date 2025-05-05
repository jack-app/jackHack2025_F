import styles from "@/app/page.module.css";
import SubscriptionList from "@/app/(protected)/subscriptionList/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <SubscriptionList />
    </div>
  );
}
