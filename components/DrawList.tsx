import React from "react";
import { Draw } from "@prisma/client";

interface DrawListProps {
  draws: Draw[];
}
export default function DrawList({ draws }: DrawListProps) {
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
          {draws.map((draw) => (
            <tr
              className="hover:bg-blue-100 last:rounded-b-2xl border border-gray-500 cursor-pointer"
              key={draw.id}
            >
              <td className="p-4 border-b">
                <a className="w-full" href={`/admin/draws/${draw.slug}`}>
                  {draw.name}
                </a>
              </td>
              <td className="p-4 border-b text-right">Editar</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
