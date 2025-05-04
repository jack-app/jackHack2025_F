// Next.js のルーター機能を使うためのフック
import { useRouter } from "next/router";
// Firebase Authentication からログアウトするための関数
import { signOut } from "firebase/auth";
// 初期化済みの Firebase 認証オブジェクト
import { auth } from "@/libs/firebase";

// ログアウトページ用の React コンポーネント
export default function LogoutPage() {
  // Next.js のページ遷移を行うための router オブジェクトを取得
  const router = useRouter();

  // ログアウト処理を行う関数（ボタンをクリックしたときに呼ばれる）
  const doLogout = async () => {
    try {
      // Firebase の signOut 関数でログアウトを実行
      await signOut(auth);
      // 成功したらログインページへ遷移（replace により戻るボタンでログイン状態に戻れないようにする）
      router.replace("/login");
    } catch (error) {
      // 失敗した場合はコンソールにエラー内容を出力（画面には表示していない）
      console.error("ログアウトに失敗しました:", error);
    }
  };

  // ボタン一つだけの簡易的なログアウト画面
  return (
    <button
      style={{
        opacity: 0.5,
        width: "80%",
        maxWidth: "200px",
        padding: "8px 10px",
        border: "1px solid red",
        borderRadius: "10px",
        backgroundColor: "white",
        color: "red",
        fontSize: "20px",
        fontWeight: "bold",
      }}
      onClick={doLogout}
    >
      ログアウト
    </button>
  );
}
