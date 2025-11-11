"use client";

import { useTransition } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Participant } from "@prisma/client";
import { removeParticipant } from "@/app/admin/actions";

interface ParticipantListProps {
  participants: Participant[];
}

export default function ParticipantList({
  participants,
}: ParticipantListProps) {
  const [isPending, startTransition] = useTransition();

  async function handleRemove(participant: Participant) {
    startTransition(async () => {
      await removeParticipant(participant);
    });
  }
  return (
    <div>
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr className="bg-blue-300">
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 rounded-tl-xl">
              Nombre
            </th>
            <th>Link</th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 text-right rounded-tr-xl">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="">
          {participants.map((participant) => (
            <tr
              className="hover:bg-blue-100 last:rounded-b-2xl border border-gray-500"
              key={participant.id}
            >
              <td className="p-4">{participant.name}</td>
              <td className="p-4">{participant.uuid}</td>
              <td className="p-4 flex pr-10 justify-end">
                <button
                  className="cursor-pointer"
                  disabled={isPending}
                  onClick={() => handleRemove(participant)}
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
