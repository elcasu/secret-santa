import ParticipantSelect from "@/components/ParticipantSelect";
import SlotMachine from "@/components/SlotMachine";

export default async function DrawPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // Server component: fetch participants to render initial state
  // For simplicity we rely on the client ParticipantSelect + SlotMachine for dynamic behavior
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sorteo</h1>
      <p>
        Por favor, seleccioná tu nombre y presioná <strong>Sortear</strong>.
      </p>

      <ParticipantSelect slug={slug} />

      <div id="animation-root" className="mt-6">
        <p className="text-sm text-gray-600">
          Animación de sorteo (slot machine)
        </p>
        {/* In a full implementation you would fetch assigned result and pass to SlotMachine */}
      </div>
    </div>
  );
}
