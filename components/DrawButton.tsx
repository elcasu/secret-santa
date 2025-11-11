import { Draw, Participant } from "@prisma/client";
import { useState } from "react";

interface DrawButtonProps {
  slug: string;
  drawer: Participant;
  onSelect: (p: Participant) => void;
}

export default function DrawButton({
  slug,
  drawer,
  onSelect,
}: DrawButtonProps) {
  const [computing, setComputing] = useState(false);

  async function assign() {
    setComputing(true);

    const res = await fetch(`/api/draws/${slug}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ participantId: drawer.id }),
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
    <button
      disabled={computing}
      className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400 w-full"
      onClick={assign}
    >
      Sortear
    </button>
  );
}
