import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ParticipantList from "@/components/ParticipantList";
import { getDrawBySlug } from "@/services/draws";
import { getParticipants } from "@/services/participants";
import CreateParticipant from "@/components/CreateParticipant";

interface AdminDrawPageProps {
  params: { slug: string };
}

export default async function AdminDrawPage({ params }: AdminDrawPageProps) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const { slug } = await params;
  const draw = await getDrawBySlug(slug);
  if (!draw) return null;
  const participants = await getParticipants(draw);

  return (
    <div>
      <h1 className="text-4xl">Participantes para el sorteo {draw.name}</h1>
      <div className="pt-10">
        {participants.length > 0 ? (
          <ParticipantList participants={participants} slug={slug} />
        ) : (
          <div className="w-full h-24 flex items-center justify-center border border-gray-400 rounded-2xl">
            Aún no hay participantes en éste sorteo
          </div>
        )}
      </div>
      <div className="pt-8">
        <h2 className="text-2xl">Agregar participante</h2>
        <CreateParticipant draw={draw} />
      </div>
    </div>
  );
}
