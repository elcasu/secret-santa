"use server";
import { getParticipants } from "@/services/participants";
import { getDrawBySlug } from "@/services/draws";
import DrawComponent from "@/components/DrawComponent";
import EmptyView from "@/components/EmptyView";

interface DrawPageProps {
  params: Promise<{ slug: string; uuid: string }>;
}

export default async function DrawPage({ params }: DrawPageProps) {
  const { slug, uuid } = await params;
  if (!slug) return null;
  const draw = await getDrawBySlug(slug);
  if (!draw) return null;

  const participants = await getParticipants(draw);
  const currentParticipant = participants.find((p) => p.uuid === uuid);

  if (!currentParticipant) {
    return <EmptyView className="mt-10">No existe el participante</EmptyView>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-center border-b border-gray-300 pb-5">
        Sorteo del amigo invisible
      </h1>
      {!!currentParticipant && (
        <h3>
          Bienvenido/a{" "}
          <span className="font-bold">{currentParticipant.name}</span>!
        </h3>
      )}
      <DrawComponent currentParticipant={currentParticipant} slug={slug} />
      <div className="text-center">
        El valor base para el regalo es de{" "}
        <span className="font-bold">$25,000</span>
      </div>
    </div>
  );
}
