// React の Context API を使うための関数や型、React Hooks をインポート
import { createContext, useContext, useEffect, useState } from "react";
// Firebase Authentication で認証状態を監視するための関数と User 型をインポート
import { onAuthStateChanged, User } from "firebase/auth";
// Firebase の認証オブジェクト（初期化済み）をインポート
import { auth } from "@/libs/firebase";

// Context の型定義。ログインユーザー（user）とローディング中かどうか（loading）を保持する
type AuthContextType = {
  user: User | null; // ログインしていれば Firebase の User オブジェクト、していなければ null
  loading: boolean; // Firebase がログイン状態を確認中かどうか
};

// createContext で Context オブジェクトを作成（初期値は user: null, loading: true）
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Context の提供者コンポーネント（アプリ全体をこの中に包むことでログイン状態を共有可能にする）
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // ログインしているユーザー情報を状態として保持。初期値は null
  const [user, setUser] = useState<User | null>(null);
  // Firebase が認証状態を確認しているかどうかのフラグ。初期状態は true（まだ確認中）
  const [loading, setLoading] = useState(true);

  // 認証状態の監視を useEffect 内で行う。コンポーネントがマウントされたタイミングで実行
  useEffect(() => {
    // Firebase の onAuthStateChanged で認証状態が変化したら user を更新
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // user はログインしていればその情報、していなければ null
      setLoading(false); // 確認が終わったので loading を false にする
    });

    // クリーンアップ関数：コンポーネントがアンマウントされたときに購読を解除
    return () => unsubscribe();
  }, []);

  // Context の値を子コンポーネントへ提供（user と loading を Context 経由で使えるようにする）
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Context から認証情報を取得するためのカスタムフック
export const useAuth = () => useContext(AuthContext);
