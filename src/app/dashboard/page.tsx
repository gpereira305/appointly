import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import LogOutButton from "./components/LogOutButton";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p> {session?.user?.name}</p>
      <p> {session?.user?.email}</p>

      <LogOutButton />
    </div>
  );
}
