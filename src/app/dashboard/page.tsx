import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import LogOutButton from "./components/LogOutButton";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });
  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p> {session?.user?.name}</p>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          width={50}
          height={50}
          alt="avatar"
          className="rounded-full object-cover"
        />
      )}
      <LogOutButton />
    </div>
  );
}
