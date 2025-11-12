import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Amigo Invisible 🎁",
    description: "Descubrí a quién te tocó en el sorteo 🎅",
    openGraph: {
      title: "Amigo Invisible 🎁",
      description: "Descubrí a quién te tocó en el sorteo 🎅",
      // url: `https://secret-santa.vercel.app/draw/${slug}`,
      images: [
        {
          url: "https://secret-santa.vercel.app/hat.png",
          width: 600,
          height: 600,
          alt: "Amigo invisible",
        },
      ],
    },
  };
}

export default function DrawLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
