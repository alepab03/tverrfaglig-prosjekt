"use client";
import { useState } from "react";

// Gjenbrukbar input-komponent i samme stil
let InputField = ({ type, placeholder }: { type: string; placeholder: string }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`
      border border-slate-300 rounded-full px-4 py-2 text-sm
      focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)] focus:outline-none
      transition
    `}
  />
);

export default function Reg() {
  let [isSignIn, setIsSignIn] = useState<boolean>(true);

  // Skjema-handlere
  let handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Logg inn sendt!");
  };

  let handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registrering sendt!");
  };

  // Dynamisk innhold for desktop-panelet
  let panelContent = isSignIn ? (
    <>
      <h2 style={{ fontSize: "var(--h2)", fontWeight: 700 }}>Velkommen!</h2>
      <p className="text-sm text-center mb-8" style={{ color: "var(--background)" }}>
        Skriv inn informasjonen din og start reisen med oss
      </p>
      <button
        onClick={() => setIsSignIn(false)}
        style={{
          borderColor: "var(--background)",
          backgroundColor: "transparent",
          color: "var(--background)"
        }}
        className="border rounded-full px-10 py-2 text-sm font-semibold hover:bg-white hover:text-[var(--green)] transition"
      >
        REGISTRER DEG
      </button>
    </>
  ) : (
    <>
      <h2 style={{ fontSize: "var(--h2)", fontWeight: 700 }}>Velkommen tilbake!</h2>
      <p className="text-sm text-center mb-8" style={{ color: "var(--background)" }}>
        For å holde kontakten, logg inn med informasjonen din
      </p>
      <button
        onClick={() => setIsSignIn(true)}
        style={{
          borderColor: "var(--background)",
          backgroundColor: "transparent",
          color: "var(--background)"
        }}
        className="border rounded-full px-10 py-2 text-sm font-semibold hover:bg-white hover:text-[var(--green)] transition"
      >
        LOGG INN
      </button>
    </>
  );

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="relative w-full h-full rounded-2xl shadow-xl overflow-hidden md:grid md:grid-cols-2">

        {/* Venstre / høyre innhold */}
        <div className={`flex flex-col items-center justify-center p-10 transition-all duration-500
          ${isSignIn ? "block" : "hidden md:flex"}`}
        >
          <h2 className="font-bold mb-6 text-2xl" style={{ color: "var(--green)" }}>
            Logg inn
          </h2>
          <form onSubmit={handleSignIn} className="w-full max-w-sm flex flex-col gap-4">
            <InputField type="email" placeholder="E-post" />
            <InputField type="password" placeholder="Passord" />
            <a className="text-xs text-right cursor-pointer hover:underline text-(--green)">
              Glemt passordet?
            </a>
            <button type="submit" style={{ backgroundColor: "var(--green)" }}
              className="mt-4 text-white rounded-full py-2 text-sm font-semibold hover:opacity-90 transition">
              LOGG INN
            </button>
          </form>
        </div>

        <div className={`flex flex-col items-center justify-center p-10 transition-all duration-500
          ${!isSignIn ? "block" : "hidden md:flex"}`}
        >
          <h2 className="font-bold mb-6 text-2xl" style={{ color: "var(--green)" }}>
            Opprett konto
          </h2>
          <form onSubmit={handleRegister} className="w-full max-w-sm flex flex-col gap-4">
            <InputField type="text" placeholder="Navn" />
            <InputField type="email" placeholder="E-post" />
            <InputField type="password" placeholder="Passord" />
            <button type="submit" style={{ backgroundColor: "var(--green)" }}
              className="mt-4 text-white rounded-full py-2 text-sm font-semibold hover:opacity-90 transition">
              REGISTRER DEG
            </button>
          </form>
        </div>

        {/* Desktop: grønt slide-panel */}
        <div
          className={`hidden md:flex absolute top-0 left-0 w-1/2 h-full flex-col items-center justify-center p-10
            transition-transform duration-700 ease-in-out ${isSignIn ? "translate-x-0" : "translate-x-full"}`}
          style={{ backgroundColor: "var(--green)", color: "var(--background)" }}
        >
          {panelContent}
        </div>

        {/* Mobil knapp */}
        <button className="md:hidden absolute top-1/2 -translate-y-1/2 p-4 text-white rounded-full shadow-lg"
          style={{
            backgroundColor: "var(--green)",
            right: isSignIn ? "10px" : "auto",
            left: !isSignIn ? "10px" : "auto"
          }}
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn ? "→" : "←"}
        </button>
      </div>
    </div>
  );
}