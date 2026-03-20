"use client";
import { useState } from "react";

// Gjenbrukbar input-komponent i samme stil
let InputField = ({ type, placeholder }: { type: string; placeholder: string }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`
      border border-slate-300 rounded-full px-4 py-2 text-sm
      focus:border-(--green) focus:ring-2 focus:ring-(--green) focus:outline-none
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
  let logIn = (<div>
      <h2 style={{ fontWeight: 700 }}>Ingen konto?</h2>
      <p className="text-sm text-left mb-8 text-(--background)">
        For å holde kontakten, registrer deg her med informasjonen din!
      </p>
      <button
        onClick={() => setIsSignIn(true)} className="border border-(--background) bg-none text-(--background) rounded-full px-10 py-2 text-sm font-semibold hover:bg-white hover:text-(--green) transition">
        REGISTRER DEG
      </button>
    </div> );
  
  let signUp = (<div>
      <h2 style={{ fontWeight: 700 }}>Har allerede konto?</h2>
      <p className="text-sm text-left mb-8 text-(--background)">
        Logg inn her!
      </p>
      <button
        onClick={() => setIsSignIn(false)} className="border border-(--background) bg-none text-(--background) rounded-full px-10 py-2 text-sm font-semibold hover:bg-white hover:text-(--green) transition">
        LOGG INN
      </button>
    </div>);

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-(--background) text-(--foreground)">
      <div className="relative w-full h-full rounded-2xl shadow-xl overflow-hidden md:grid md:grid-cols-2">

        {/* Venstre / høyre innhold */}
        <div className={`flex flex-col items-center justify-center p-10 transition-all duration-500
          ${isSignIn ? "block" : "hidden md:flex"}`}
        >
          <h2 className="font-bold mb-6 text-2xl text-(--green)">
            Logg inn
          </h2>
          <form onSubmit={handleSignIn} className="w-full max-w-sm flex flex-col gap-4">
            <InputField type="email" placeholder="E-post" />
            <InputField type="password" placeholder="Passord" />
            <a className="text-xs text-right cursor-pointer hover:underline text-(--green)">
              Glemt passordet?
            </a>
            <button type="submit" className="mt-4 bg-(--green) text-white rounded-full py-2 text-sm font-semibold hover:opacity-90 transition">
              LOGG INN
            </button>
          </form>
        </div>

        <div className={`flex flex-col items-center justify-center p-10 transition-all duration-500
          ${!isSignIn ? "block" : "hidden md:flex"}`}
        >
          <h2 className="font-bold mb-6 text-2xl text-(--green)">
            Opprett konto
          </h2>
          <form onSubmit={handleRegister} className="w-full max-w-sm flex flex-col gap-4">
            <InputField type="text" placeholder="Navn" />
            <InputField type="email" placeholder="E-post" />
            <InputField type="password" placeholder="Passord" />
            <button type="submit" className="mt-4 bg-(--green) text-white rounded-full py-2 text-sm font-semibold hover:opacity-90 transition">
              REGISTRER DEG
            </button>
          </form>
        </div>

        {/* Desktop: grønt slide-panel */}
        <div
          className={`hidden md:flex absolute top-0 bg-(--green) text-(--background) left-0 w-1/2 h-full flex-col items-center justify-center p-10
          transition-transform duration-700 ease-in-out ${isSignIn ? "translate-x-0" : "translate-x-full"}`}>
          {isSignIn ? signUp : logIn}
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