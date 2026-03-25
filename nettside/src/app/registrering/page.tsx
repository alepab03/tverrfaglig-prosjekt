"use client";
import { useState } from "react";
import axios from 'axios';

// Gjenbrukbar input-komponent i samme stil
let InputField = ({ type, placeholder, value, onChange, name }: { type: string; placeholder: string; value: any; onChange: any; name: string; }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`
      border border-slate-300 rounded-full px-4 py-2 text-sm
      focus:border-(--green) focus:ring-2 focus:ring-(--green) focus:outline-none
      transition
    `}
    value={value}
    onChange={onChange}
    name={name}
  />
);

export default function Reg() {
  const [formValues, setFormValues] = useState<any>({username: '', password: ''});

  // Skjema-handlere
  let handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3306/auth/login', formValues);
      if(response.status === 201) {
        localStorage.setItem('token', response.data.token);
        /* navigate to homepage somehow, ill figure it out */
      }
    } catch (error) {
      console.log('Failed to register data', error);
    }
    console.log("Logg inn sendt!");
  };

  const handleFormValueChange = (e: any) => {
        setFormValues({...formValues, [e.target.name]:e.target.value});
  };

  return (
    <div
      className="h-screen w-screen flex items-center mt-40 bg-(--background) text-(--foreground)">
      <div className="relative w-full h-full rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col items-center p-10">
          <h2 className="font-bold mb-6 text-2xl text-(--green)">
            Logg inn
          </h2>
          <form onSubmit={handleSignIn} className="w-full max-w-sm flex flex-col gap-4">
            <InputField type="text" placeholder="Brukernavn" value={formValues.username} onChange={handleFormValueChange} name="username" />
            <InputField type="password" placeholder="Passord" value={formValues.password} onChange={handleFormValueChange} name="password" />
            <button type="submit" className="mt-4 bg-(--green) text-white rounded-full py-2 text-sm font-semibold hover:opacity-90 transition">
              LOGG INN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}