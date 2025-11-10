"use client";
import { useEffect, useState } from "react";

export default function ParticipantSelect({ slug }: { slug: string }) {
  const [participants, setParticipants] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/draws/${slug}/participants`)
      .then((r) => r.json())
      .then((data) => setParticipants(data));
  }, [slug]);

  async function assign() {
    if (!selectedId) return;
    const res = await fetch(`/api/draws/${slug}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ participantId: selectedId }),
    });
    const json = await res.json();
    if (res.ok) {
      // redirect to show result (we let the draw page handle the animation)
      window.location.reload();
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
        onClick={assign}
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Sortear
      </button>
    </div>
  );
}
