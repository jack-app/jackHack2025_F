// React の useEffect, useState フックをインポート
import { useEffect, useState } from "react";
// Next.js のページ遷移用ルーターをインポート
import { useRouter } from "next/router";
// Firebase の email/password ログイン関数をインポート
import { signInWithEmailAndPassword } from "firebase/auth";
// Firebase の初期化済み auth オブジェクトをインポート
import { auth } from "@/libs/firebase";
// カスタム AuthContext（ログイン状態を共有する）から useAuth フックをインポート
import { useAuth } from "../../contexts/AuthContext";

// ログインページコンポーネント
export default function LoginPage() {
  // Next.js のルーターオブジェクト（ページ遷移に使う）
  const router = useRouter();

  // useAuth により現在のユーザー情報とローディング状態を取得
  const { user, loading } = useAuth();

  // 入力されたメールアドレスとパスワードを保持する state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // エラーメッセージを表示するための state
  const [error, setError] = useState("");

  // ログイン済みかどうかを監視し、済みであればトップページにリダイレクト
  useEffect(() => {
    if (!loading && user) {
      router.replace("/"); // トップページへ遷移（replace により戻るボタンで戻れなくする）
    }
  }, [user, loading, router]); // user または loading が変化するたびに実行

  // フォーム送信時のログイン処理
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルト送信（リロード）を無効化
    try {
      // Firebase Auth を用いたログイン処理
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // 成功したらトップページに遷移
    } catch (err) {
      // エラーがあればメッセージを表示
      if (err instanceof Error) {
        setError(err.message); // エラーメッセージを表示
      } else {
        setError("ログインに失敗しました。"); // 一般的なメッセージ
      }
    }
  };

  // ログイン状態を確認中、またはすでにログイン済みの場合は「Loading...」を表示
  if (loading || user) {
    return <div>Loading...</div>;
  }

  // ログインフォームの描画
  return (
    <div>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#B35F5F",
              borderRadius: "8px",
              marginRight: "12px",
            }}
          />
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>サブキャン</h1>
        </div>
        <div>
          <p
            style={{
              marginBottom: "16px",
              textAlign: "start",
              fontWeight: "bold",
            }}
          >
            今すぐ参加しましょう
          </p>
        </div>

        <button
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "24px",
            border: "1px solid #333",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          Googleで登録
        </button>

        <p style={{ marginBottom: "12px" }}>または</p>

        <button
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "32px",
            borderRadius: "24px",
            border: "1px solid #333",
            backgroundColor: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          アカウントを作成
        </button>

        {/* ログイン案内 */}
        <div>
          <p
            style={{
              marginBottom: "12px",
              textAlign: "start",
              fontWeight: "bold",
            }}
          >
            アカウントをお持ちの方
          </p>
        </div>

        {/* ログインボタン */}
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "24px",
            border: "1px solid #497171",
            backgroundColor: "#f0fdfc",
            color: "#497171",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ログイン
        </button>
      </div>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email} // 入力された値を state に反映
          onChange={(e) => setEmail(e.target.value)} // 入力内容が変更されたら更新
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">ログイン</button>
      </form>

      {/* エラーがある場合は表示 */}
      {error && <p>{error}</p>}
    </div>
  );
}
