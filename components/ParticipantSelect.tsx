"use client";
import { useEffect, useState } from "react";
import { Participant } from "@prisma/client";

interface ParticipantSelectProps {
  slug: string;
  participants: Participant[];
  onSelect: (p: Participant) => void;
}

export default function ParticipantSelect({
  slug,
  participants,
  onSelect,
}: ParticipantSelectProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [computing, setComputing] = useState(false);

  async function assign() {
    if (!selectedId) return;
    setComputing(true);

    const res = await fetch(`/api/draws/${slug}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ participantId: selectedId }),
    });
    const json = await res.json();
    if (res.ok) {
      console.log("Assigned to ->", json.assignedTo);
      onSelect(json.assignedTo as Participant);
    } else {
      alert(json.error || "Error");
    }
  }

  return (
    <div className="space-y-4">
      <label className="block">Seleccioná tu nombre</label>
      <select
        className="p-2 border rounded w-full"
        value={selectedId ?? ""}
        onChange={(e) => setSelectedId(Number(e.target.value))}
      >
        <option value="">-- Seleccioná --</option>
        {participants.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <button
        disabled={!selectedId || computing}
        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400 w-full"
        onClick={assign}
      >
        Sortear
      </button>
    </div>
  );
}
