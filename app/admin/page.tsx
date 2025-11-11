import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DrawList from "@/components/DrawList";
import { getDraws } from "@/services/draws";

export default async function AdminPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const draws = await getDraws();
  return (
    <div>
      <h1 className="text-4xl">Seleccione un sorteo</h1>
      <div className="pt-6">
        <DrawList draws={draws} />
      </div>
    </div>
  );
}
