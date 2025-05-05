"use client";
import { useState } from "react";
import { loginWithGoogle, loginWithEmail } from "@/libs/firebase-auth";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setErrorMsg("メールアドレスまたはパスワードが正しくありません");
    } finally {
      setLoading(false);
    }
  };

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

        <p
          style={{
            marginBottom: "16px",
            textAlign: "start",
            fontWeight: "bold",
          }}
        >
          今すぐ参加しましょう
        </p>

        <button
          onClick={loginWithGoogle}
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
          <Image
            width={20}
            height={20}
            src="/images/google.png"
            alt="Google"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          Googleでログイン
        </button>

        <p style={{ marginBottom: "12px" }}>または</p>

        {/* メールアドレス認証フォーム */}
        <div style={{ marginBottom: "24px" }}>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleEmailLogin}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "24px",
              border: "1px solid #333",
              backgroundColor: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {loading ? "ログイン中..." : "メールアドレスでログイン"}
          </button>
          {errorMsg && (
            <p style={{ color: "red", marginTop: "8px" }}>{errorMsg}</p>
          )}
        </div>

        <div>
          <p
            style={{
              marginBottom: "12px",
              textAlign: "start",
              fontWeight: "bold",
            }}
          >
            初めての方は
          </p>
        </div>

        <Link href="/auth/register">
          <button
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "24px",
              border: "none",
              backgroundColor: "#497171",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            アカウントを作成
          </button>
        </Link>
      </div>
    </div>
  );
}
