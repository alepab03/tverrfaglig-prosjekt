"use client"
import Button from "@/src/components/button";
import Header from "@/src/components/header";
import Nav from "@/src/components/nav";
import { useEffect, useState } from "react";


export default function Administrering() {
    /* Her skal data om adgangskort fra databasen inn (cardData), midlertidige values for testing \/ */
    const [cardData, setCardData] = useState<any[]>([{id: 1, name: "navn navnesen", access: false, code: 1234}, {id: 2, name: "Trine", access: true, code: "0414"}]);
    const [isOpen, setIsOpen] = useState<boolean>(false); /* for opening pop up */
    const [selected, setSelected] = useState<number>(0); /* Selected row in table when opening editing pop up */
    const [formValues, setFormValues] = useState<any>({name: '', code: '', access: ''}); /* values for pop up form */
    const [inputType, setInputType] = useState<string>('password'); /* for "se kode" button */
    const [inputTypeToggle, setInputTypeToggle] = useState<boolean>(true); /* for "se kode" button */

    const handlePopUpOpen = (index: number) => {
        setSelected(index);
        setIsOpen(true);
    }

    useEffect(() => {
        setFormValues({name: cardData[selected].name, code: cardData[selected].code, access: cardData[selected].access});
    }, [selected]);

    const handleInputValueChange = (e: any) => {
        setFormValues({...formValues, [e.target.name]:e.target.value});
    }

    const handleInputTypeToggle = (e: any) => {
        e.preventDefault();
        setInputTypeToggle(!inputTypeToggle);
        if(inputTypeToggle === true) {
            setInputType('text');
        } else {
            setInputType('password');
        }
    };

    return(
        <div className="grid grid-cols-4 auto-rows-auto">
            <div className="col-span-5 row-span-1">
                <Header />
            </div>
            <div className="col-span-1 row-start-2 row-end-3">
                <Nav location="adgangskontroll" />
            </div>
            {/* pop up */}
            <div className={`background-popup ${isOpen ? 'open' : ''}`}>
  <div className="bg-white w-[90%] sm:w-[30%] rounded-xl shadow-lg p-6 flex flex-col">
    <h3 className="font-bold text-lg mb-4 text-gray-800">Rediger adgangskort</h3>

    <form className="flex flex-col gap-4">

      <div className="flex flex-col">
        <label className="font-semibold text-sm text-gray-700">Kortnummer</label>
        <input
          type="text"
          readOnly
          value={cardData[selected].id}
          className="border rounded-md px-2 py-1 bg-gray-100 text-gray-600"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-sm text-gray-700">Eier</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputValueChange}
          className="border rounded-md px-2 py-1"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-sm text-gray-700">Kode</label>
        <div className="flex gap-2 items-center">
          <input
            type={inputType}
            name="code"
            value={formValues.code}
            onChange={handleInputValueChange}
            className="border rounded-md px-2 py-1 w-full"
          />
          <button
            onClick={handleInputTypeToggle}
            className="text-xs font-semibold border rounded-md px-2 py-1 hover:bg-gray-100"
          >
            {inputTypeToggle ? "Se" : "Skjul"}
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-sm text-gray-700">Tilgang</label>
        <select
          name="access"
          className="border rounded-md px-2 py-1"
        >
          <option disabled>{cardData[selected].access ? "Ja" : "Nei"}</option>
          <option value="true">Ja</option>
          <option value="false">Nei</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
        >
          Avbryt
        </button>

        <Button color={0} title="Lagre endringer" />
      </div>

    </form>
  </div>
</div>

            {/* tabell */}
            <div className="col-span-3 flex flex-col mt-10 px-6">
                <div className="card-table">
                    <div className="mb-4">
    <h2 className="text-xl font-semibold text-[var(--green)]">Adgangskontroll</h2>
    <p className="text-sm text-gray-400">Administrer adgangskort</p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-100">
          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Kort nr.</th> 
          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Eier</th>
          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Kode</th>
          <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Tilgang</th>
          <th className="px-4 py-3"></th>
        </tr>
      </thead>

      <tbody>                       
        {cardData.map((data: any, index: number) => {
          const access = data.access ? "Ja" : "Nei";

          const [type, setType] = useState<string>('password');
          const [typeToggle, setTypeToggle] = useState<boolean>(true);

          const handleTypeToggle = () => {
            setTypeToggle(!typeToggle);
            setType(typeToggle ? 'text' : 'password');
          };

          return(
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              
              <td className="px-4 py-3 text-sm font-mono">
                #{data.id}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-[var(--green)]">
                {data.name}
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <input
                    type={type}
                    value={data.code}
                    readOnly
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md w-16 outline-none"
                  />
                  <button
                    onClick={handleTypeToggle}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    {typeToggle ? "Vis" : "Skjul"}
                  </button>
                </div>
              </td>

              <td className="px-4 py-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  data.access 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {access}
                </span>
              </td>

              <td className="px-4 py-3">
                <Button color={0} title="Rediger" onClick={() => handlePopUpOpen(index)} />
              </td>

            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
                </div>
            </div>
        </div>
    );
}