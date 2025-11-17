"use client";
import { useState, useEffect } from "react";
import { Participant } from "@prisma/client";
import DrawButton from "./DrawButton";
import RevealTarget from "./RevealTarget";
import { getParticipant } from "@/app/admin/actions";

interface DrawComponentProps {
  currentParticipant: Participant;
  slug: string;
}

export default function DrawComponent({
  currentParticipant,
  slug,
}: DrawComponentProps) {
  const [target, setTarget] = useState<Participant | undefined>();

  useEffect(() => {
    async function fetchParticipant() {
      if (!currentParticipant?.assignedTo) return;
      const p = await getParticipant(currentParticipant.assignedTo);
      if (p) {
        setTarget(p);
      }
    }
    fetchParticipant();
  }, [currentParticipant.assignedTo]);

  const handleSelect = (p: Participant) => {
    setTarget(p);
  };

  return (
    <>
      {!currentParticipant?.assignedTo && (
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
    </>
  );
}
