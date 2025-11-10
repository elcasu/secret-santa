import DrawList from "@/components/DrawList";
import { getDraws } from "@/services/draws";
// import { useState, useEffect } from "react";

export default async function AdminPage() {
  const draws = await getDraws();
  return (
    <div>
      <h1 className="text-4xl">Seleccione un sorteo</h1>
      <div className="pt-6">
        <DrawList draws={draws} />
      </div>
    </div>
  );
}

// export default async function AdminPage() {
//   const [slug, setSlug] = useState("");
//   const [drawName, setDrawName] = useState("");
//   const [participants, setParticipants] = useState<
//     { id?: number; name: string }[]
//   >([]);
//   const [newName, setNewName] = useState("");
//
//   async function createDraw() {
//     const res = await fetch("/api/draws", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ slug, name: drawName }),
//     });
//     if (res.ok) alert("Draw created");
//   }
//
//   async function addParticipant() {
//     if (!newName.trim()) return;
//     const res = await fetch(`/api/draws/${slug}/participants`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: newName }),
//     });
//     if (res.ok) {
//       setNewName("");
//       alert("Participant added");
//     }
//   }
//
//   async function getDraws() {
//     const res = await fetch("/api/draws");
//     const data = await res.json();
//     return data;
//   }
//
//   const draws = await getDraws();
//   console.log("DRAWS ->", draws);
//
//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-semibold">Panel de administrador</h2>
//
//       <DrawList draws={draws} />
//
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//         <input
//           value={slug}
//           onChange={(e) => setSlug(e.target.value)}
//           className="p-2 border rounded"
//           placeholder="draw slug (e.g. christmas2025)"
//         />
//         <input
//           value={drawName}
//           onChange={(e) => setDrawName(e.target.value)}
//           className="p-2 border rounded"
//           placeholder="draw name"
//         />
//       </div>
//
//       <div className="flex gap-2">
//         <button
//           onClick={createDraw}
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Crear sorteo
//         </button>
//         <a
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//           href={`/draw/${slug}`}
//         >
//           Abrir enlace público
//         </a>
//       </div>
//
//       <div className="mt-4">
//         <h3 className="font-medium">Agregar participante</h3>
//         <div className="flex gap-2 mt-2">
//           <input
//             value={newName}
//             onChange={(e) => setNewName(e.target.value)}
//             className="p-2 border rounded flex-1"
//             placeholder="Nombre"
//           />
//           <button
//             onClick={addParticipant}
//             className="px-4 py-2 bg-indigo-600 text-white rounded"
//           >
//             Agregar
//           </button>
//         </div>
//       </div>
//
//       <p className="text-sm text-gray-600">
//         To keep the example small the admin UI uses client fetches to API
//         routes. Protect this route using NextAuth middleware in production.
//       </p>
//     </div>
//   );
// }
