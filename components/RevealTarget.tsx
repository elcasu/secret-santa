import { motion } from "framer-motion";

export default function RevealTarget({ target }: { target: string }) {
  return (
    <>
      <motion.div
        className="text-2xl"
        initial={{
          opacity: 0,
          x: "100%",
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
      >
        Tu amigo invisible es...
      </motion.div>
      <div
        style={
          {
            "--color1": "#9f0712",
            "--color2": "#016630",
          } as React.CSSProperties
        }
      >
        <motion.div
          className="text-6xl font-extrabold w-full flex items-center justify-center h-48 text-center color-switch text-green-800"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 1,
          }}
        >
          {target}
        </motion.div>
      </div>
    </>
  );
}
