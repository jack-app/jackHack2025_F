// Reactのフックをインポート
import { useState, useEffect } from "react";

// Firestore操作用の関数をインポート（addUser: 登録、getUsers: 一覧取得）
import { addUser, getUsers } from "@/libs/firestore";

// ユーザー型を定義（Firestoreのユーザーデータを扱うため）
type User = {
  id: string; // FirestoreドキュメントID
  name: string; // ユーザー名
  email: string; // ユーザーメールアドレス
};

// Firestoreとのデータ通信をテストするコンポーネント
export default function DbTestPage() {
  // Firestoreから取得したユーザー一覧
  const [users, setUsers] = useState<User[]>([]);

  // 入力フォームの状態管理（名前）
  const [name, setName] = useState("");

  // 入力フォームの状態管理（メールアドレス）
  const [email, setEmail] = useState("");

  // ローディング状態（データ取得中の表示切り替え用）
  const [loading, setLoading] = useState(false);

  // Firestoreからユーザー一覧を非同期で取得する関数
  const fetchUsers = async () => {
    setLoading(true); // ローディング開始
    const usersData = await getUsers(); // Firestoreからデータ取得
    setUsers(usersData); // ステートに反映
    setLoading(false); // ローディング終了
  };

  // 新規ユーザーを追加するフォームの送信処理
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault(); // ページリロードを防止
    if (!name || !email) return; // 空欄は無視

    await addUser(name, email); // Firestoreに追加

    // フォームを初期化
    setName("");
    setEmail("");

    // 追加後に最新の一覧を再取得
    fetchUsers();
  };

  // 初回レンダリング時にユーザー一覧を取得（componentDidMount相当）
  useEffect(() => {
    fetchUsers();
  }, []);

  // 表示部分
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Firestore Test</h1>

      {/* ユーザー追加フォーム */}
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // 入力時にステートを更新
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 入力時にステートを更新
          required
        />
        <button type="submit">Add User</button>
      </form>

      <hr />

      {/* ユーザー一覧の表示 */}
      <h2>User List</h2>
      {loading ? (
        <p>Loading...</p> // ローディング中
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email}) // 各ユーザーをリスト表示
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
