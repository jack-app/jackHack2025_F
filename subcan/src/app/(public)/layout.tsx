import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

const Layout = async ({ children }: { children: ReactElement }) => {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect(`/`);

  return <>{children}</>;
};

export default Layout;
