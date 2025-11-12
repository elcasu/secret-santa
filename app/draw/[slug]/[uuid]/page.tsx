"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "@radix-ui/themes";
import { Participant } from "@prisma/client";
import RevealTarget from "@/components/RevealTarget";
import DrawButton from "@/components/DrawButton";

export default function DrawPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentParticipant, setCurrentParticipant] = useState<
    Participant | undefined
  >();
  const [target, setTarget] = useState<Participant | undefined>();
  const [loaded, setLoaded] = useState(false);
  const { slug, uuid } = useParams();
  if (!slug) return null;

  useEffect(() => {
    fetch(`/api/draws/${slug}/participants`)
      .then((r) => r.json())
      .then((data) => setParticipants(data));
  }, [slug]);

  useEffect(() => {
    if (!participants?.length) return;
    setCurrentParticipant(participants.find((p) => p.uuid === uuid));
  }, [participants]);

  useEffect(() => {
    if (!currentParticipant) return;
    if (currentParticipant?.assignedTo) {
      setTarget(
        participants.find((p) => p.id === currentParticipant.assignedTo)
      );
      return;
    }
    setLoaded(true);
  }, [currentParticipant]);

  useEffect(() => {
    if (target) {
      setLoaded(true);
    }
  }, [target]);

  const handleSelect = (p: Participant) => {
    setTarget(p);
  };

  if (!currentParticipant) {
    return <Spinner />;
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
      {loaded && !currentParticipant?.assignedTo && (
        <>
          <p>
            Por favor, para elegir a tu amigo invisible, presioná{" "}
            <strong>Sortear</strong>.
          </p>
          <DrawButton
            slug={slug as string}
            drawer={currentParticipant as Participant}
            onSelect={handleSelect}
          />
        </>
      )}

      <div id="animation-root" className="mt-6">
        {!!target && <RevealTarget target={target.name} />}
      </div>
      <div className="text-center">
        El valor base para el regalo es de{" "}
        <span className="font-bold">$25,000</span>
      </div>
    </div>
  );
}
