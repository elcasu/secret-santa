"use client";
import { useState, useTransition } from "react";
import { addParticipant } from "@/app/admin/actions";
import { Draw } from "@prisma/client";

interface CreateParticipantProps {
  draw: Draw;
}

export default function CreateParticipant({ draw }: CreateParticipantProps) {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAdd = async () => {
    startTransition(async () => {
      await addParticipant(draw, name);
      setName("");
    });
  };

  return (
    <div className="py-6 flex gap-5">
      <input
        name="participant-name"
        type="text"
        placeholder="Ingrese un nombre"
        className="border border-gray-400 px-2 py-2 rounded-sm w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="rounded-xl bg-green-500 text-white w-64"
        disabled={isPending}
        onClick={handleAdd}
      >
        {isPending ? "Agregando..." : "Agregar participante"}
      </button>
    </div>
  );
}
