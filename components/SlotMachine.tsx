"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Participant } from "@prisma/client";

export default function SlotMachine({
  items,
  targetName,
  onComplete,
}: {
  items: Participant[];
  targetName?: string;
  onComplete?: () => void;
}) {
  const controls = useAnimation();
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!targetName) return;

    // Build a long list to scroll: repeat items several times and ensure target appears multiple times
    const repeated = Array.from({ length: 30 }).flatMap(() =>
      items.map((i) => i.name)
    );
    const index = repeated.findIndex((n) => n === targetName);
    const itemHeight = 48; // match CSS line height

    const distance = index * itemHeight + Math.random() * itemHeight; // small offset

    controls
      .start({
        y: -distance,
        transition: { duration: 3.0, ease: [0.22, 1, 0.36, 1] },
      })
      .then(() => {
        setDone(true);
        onComplete?.();
      });
  }, [targetName]);

  return (
    <div className="overflow-hidden border rounded h-48">
      <motion.div animate={controls} ref={containerRef}>
        {Array.from({ length: 30 }).flatMap((_, i) =>
          items.map((it, idx) => (
            <div
              key={`${i}-${idx}`}
              className="h-12 flex items-center justify-center border-b"
            >
              {it.name}
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
}
