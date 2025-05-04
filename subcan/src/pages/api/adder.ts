// Next.js の API ルートに必要な型定義をインポート
import { NextApiRequest, NextApiResponse } from "next";

// API ルートのエントリポイント関数（この関数が HTTP リクエストを処理する）
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // HTTP メソッドが POST の場合のみ処理を行う
  if (req.method === "POST") {
    // リクエストボディから a と b を取り出す
    const { a, b } = req.body;

    // a, b の両方が number 型であることを確認
    if (typeof a === "number" && typeof b === "number") {
      const sum = a + b; // 加算処理
      // 計算結果を JSON 形式で返す（ステータス 200: OK）
      res.status(200).json({ sum });
    } else {
      // 入力が不正な場合（数値でない場合）は 400: Bad Request を返す
      res
        .status(400)
        .json({ error: "Invalid input. Please provide two numbers." });
    }
  } else {
    // POST 以外の HTTP メソッド（例: GET, PUT）は許可しない（405: Method Not Allowed）
    res.status(405).json({ error: "Method not allowed. Use POST." });
  }
}
