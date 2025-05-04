import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Header from "./Header";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && router.pathname !== "/test/login") {
      router.push("/test/login");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AuthGuard>
        <Header />
        <Component {...pageProps} />
      </AuthGuard>
    </AuthProvider>
  );
}
