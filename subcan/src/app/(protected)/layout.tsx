import Header from "@/components/Header";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

const Layout = async ({ children }: { children: ReactElement }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect(`/auth/login`);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
