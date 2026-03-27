"use client";

import Header from "@/src/components/header";
import Nav from "@/src/components/nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/src/components/button";

export default function Brukeradministrering() {
  const [userData, setUserData] = useState<any[]>([
    { username: "2inf", password: "testing", access: "admin" },
    { username: "2del", password: "testing", access: "admin" },
  ]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>({
    username: "",
    password: "",
  });

  const router = useRouter();

  // authorization
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.get("http://localhost:5000/auth/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      // router.replace('/logg-inn');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleFormValueChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        formValues
      );

      if (response.status === 201) {
        setUserData([...userData, formValues]); // oppdater UI
        setIsOpen(false);
      }
    } catch (error) {
      console.log("Failed to register data", error);
    }

    setFormValues({ username: "", password: "" });
  };

  const handlePopUpOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="grid grid-cols-4 auto-rows-auto">
      {/* Header */}
      <div className="col-span-5">
        <Header />
      </div>

      {/* Nav */}
      <div className="col-span-1 row-start-2">
        <Nav location="brukeradministrering" />
      </div>

      {/* Popup */}
      <div className={`background-popup ${isOpen ? "open" : ""}`}>
        <div className="bg-white w-[90%] sm:w-[30%] rounded-xl shadow-lg p-6 flex flex-col">
          <h3 className="font-bold text-lg mb-4 text-gray-800">
            Opprett bruker
          </h3>

          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label className="font-semibold text-sm text-gray-700">
                Brukernavn
              </label>
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleFormValueChange}
                className="border rounded-md px-2 py-1"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm text-gray-700">
                Passord
              </label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleFormValueChange}
                className="border rounded-md px-2 py-1"
                required
              />
            </div>

            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={handlePopUpOpen}
                className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
              >
                Avbryt
              </button>

              <Button title="Opprett bruker" color={0} />
            </div>
          </form>
        </div>
      </div>

      {/* Content */}
      <div className="col-span-3 flex flex-col mt-10 px-6">
        <div className="card-table">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-(--green)">
              Brukeradministrering
            </h2>
            <p className="text-sm text-gray-400">
              Administrer brukere
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-xs text-gray-400">
                    Brukernavn
                  </th>
                  <th className="px-4 py-3 text-xs text-gray-400">
                    Passord
                  </th>
                  <th className="px-4 py-3 text-xs text-gray-400">
                    Tilgang
                  </th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {userData.map((data: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-(--green)">
                      {data.username}
                    </td>

                    <td className="px-4 py-3">
                      <input
                        type="password"
                        value={data.password}
                        readOnly
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md w-20"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2 py-1 rounded-md bg-green-100 text-green-700">
                        {data.access}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <Button title="Rediger" color={0} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <Button
              color={0}
              title="Legg til ny bruker"
              onClick={handlePopUpOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}