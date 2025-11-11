"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6">Iniciar sesión</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/admin" })}
        className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
      >
        Ingresar con Google
      </button>
    </div>
  );
}
