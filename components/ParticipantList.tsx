import { Participant } from "@prisma/client";

interface ParticipantListProps {
  participants: Participant[];
}

export default function ParticipantList({
  participants,
}: ParticipantListProps) {
  return (
    <div>
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr className="bg-blue-300">
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 rounded-tl-xl">
              Nombre
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 text-right rounded-tr-xl">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="">
          {participants.map((participant) => (
            <tr
              className="hover:bg-blue-100 last:rounded-b-2xl border border-gray-500 cursor-pointer"
              key={participant.id}
            >
              <td className="p-4 border-b">{participant.name}</td>
              <td className="p-4 border-b text-right">Editar</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
