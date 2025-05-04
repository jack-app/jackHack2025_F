// React の useState フックをインポート
import { useState } from "react";

// API 加算テストページのコンポーネント定義
export default function TestApiPage() {
  // 入力値 a（数値）の状態管理。初期値は 0。
  const [a, setA] = useState<number>(0);

  // 入力値 b（数値）の状態管理。初期値は 0。
  const [b, setB] = useState<number>(0);

  // API の結果（加算結果）を格納する状態。初期は null（未取得）
  const [result, setResult] = useState<number | null>(null);

  // エラーメッセージ表示用の状態。初期は空文字列（エラーなし）
  const [error, setError] = useState<string>("");

  // フォーム送信時に呼び出されるイベントハンドラ（非同期関数）
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // フォーム送信時のページリロードを防止

    setError(""); // 前回のエラーを初期化
    setResult(null); // 結果も初期化（送信前の状態に戻す）

    try {
      // fetch API を使って、ローカルAPIエンドポイント /api/adder に POST リクエストを送信
      const response = await fetch("/api/adder", {
        method: "POST", // HTTP メソッドは POST
        headers: { "Content-Type": "application/json" }, // JSON データ送信を明示
        body: JSON.stringify({ a, b }), // 入力値 a, b を JSON 形式で送信
      });

      // レスポンスを JSON としてパース
      const data = await response.json();

      // ステータスコードが 200（成功）だった場合
      if (response.ok) {
        setResult(data.sum); // 結果を state に格納して表示
      } else {
        // エラーが含まれている場合はエラーメッセージを表示
        setError(data.error || "API error"); // レスポンスに error フィールドがあれば使用
      }
    } catch (err) {
      // fetch 自体が失敗（ネットワークエラー等）の場合
      if (err instanceof Error) {
        setError(err.message); // JavaScript の Error オブジェクトからメッセージを抽出
      } else {
        setError("通信エラーが発生しました"); // それ以外の場合（ほぼ無いが保険）
      }
    }
  };

  // JSX: 画面に表示する内容
  return (
    <div style={{ padding: "2rem" }}>
      <h1>API 加算テスト</h1>
      <p>/src/api/adder.ts　を叩いて結果を表示します</p>

      {/* フォーム：a, b を入力して送信 */}
      <form onSubmit={handleSubmit}>
        <input
          type="number" // 数値入力
          value={a} // a の値を反映
          onChange={(e) => setA(Number(e.target.value))} // 入力変更時に a を更新
          placeholder="a" // プレースホルダ
        />
        <input
          type="number"
          value={b}
          onChange={(e) => setB(Number(e.target.value))}
          placeholder="b"
        />
        <button type="submit">送信</button> {/* フォーム送信ボタン */}
      </form>

      {/* 結果表示：result が null でなければ表示 */}
      {result !== null && <p>結果: {result}</p>}

      {/* エラー表示：error が空でなければ表示 */}
      {error && <p style={{ color: "red" }}>エラー: {error}</p>}
    </div>
  );
}
