"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const InputField = ({ type, placeholder, value, onChange, name }: InputFieldProps) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full bg-white border border-[#005850]/20 rounded-xl px-4 py-3 text-sm text-(--foreground) placeholder-[#005850]/30 focus:outline-none focus:border-(--green) focus:ring-2 focus:ring-(--green)/10 transition-all duration-200"
    value={value}
    onChange={onChange}
    name={name}
  />
);

export default function Reg() {
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/auth/login", formValues);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
       // router.replace("/");//
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError("Feil brukernavn eller passord.");
      } else {
        setError("Noe gikk galt. Prøv igjen.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-(--background)">

      {/* Left panel */}
      <div className="hidden md:flex relative flex-col justify-end p-12 bg-(--green) overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      
        <div className="absolute top-6 right-6 grid grid-cols-6 gap-2">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-white/20" />
          ))}
        </div>

        <div className="relative z-10">
          <h1 className="font-serif text-5xl font-bold text-white leading-tight tracking-tight mb-70">
            Velkommen<br />tilbake.
          </h1>
        
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center px-6 py-16 bg-(--background)">
        <div className="w-full max-w-sm">
          <p className="text-[10px] tracking-[0.18em] uppercase text-(--light-green) font-medium mb-1">
            Konto
          </p>
          <h2 className="font-serif font-bold text-(--green) tracking-tight mb-10 text-[length:--h1]">
            Logg inn
          </h2>

          <form onSubmit={handleSignIn} className="flex flex-col gap-3">
            <InputField
              type="text"
              placeholder="Brukernavn"
              value={formValues.username}
              onChange={handleFormValueChange}
              name="username"
            />
            <InputField
              type="password"
              placeholder="Passord"
              value={formValues.password}
              onChange={handleFormValueChange}
              name="password"
            />

            {error && (
              <p className="text-red-500 text-[length:--p] text-center mt-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-(--green) hover:bg-(--light-green) disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3.5 text-[length:--p] font-medium tracking-[0.08em] uppercase transition-all duration-200 hover:-translate-y-px active:translate-y-0"
            >
              {loading ? "Logger inn..." : "Logg inn"}
            </button>
          </form>

          <div className="flex items-center gap-3 mt-10">
            <div className="flex-1 h-px bg-(--green)/20" />
            <span className="text-[10px] tracking-widest text-(--green)/40 uppercase">
              Sikker innlogging
            </span>
            <div className="flex-1 h-px bg-(--green)/20" />
          </div>
        </div>
      </div>
    </div>
  );
}