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
        <div className="grid grid-cols-5 auto-rows-auto">
            <div className="col-span-5 row-span-1">
                <Header />
            </div>
            <div className="col-span-1 row-start-2 row-end-3">
                <Nav location="adgangskontroll" />
            </div>
            {/* pop up */}
            <div className={`background-popup ${isOpen ? 'open' : ''} `}>
                <div className="bg-white w-[90%] sm:w-[30%] sm:h-[35vh] rounded-[0.313rem] flex flex-col items-center justify-center">
                    <h3 className="font-bold mt-2 mb-4">Rediger adgangskort</h3>
                    <form method="POST"> {/* vet ikke hvor nødvendig "method='POST'" er til vanlig når vi får inn funksjonalitet men bruker den nå får å hindre att info dukker opp i URL, er ikke ett stort problem siden ingen kommer til å se det men plager meg litt */}
                        <div>
                            <label htmlFor="id" className="font-bold">Kortnummer:</label>
                            <input type="text" name="id" id="id" readOnly value={cardData[selected].id} className="outline-0 rounded-[0.313rem] pl-2"/>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="name" className="font-bold">Eier:</label>
                            <input type="text" name="name" id="name" value={formValues.name} onChange={handleInputValueChange} className="border ml-2 rounded-[0.313rem] pl-2"/>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="code" className="font-bold">Kode:</label>
                            <input type={inputType} name="code" id="code" value={formValues.code} onChange={handleInputValueChange} className="border ml-2 mr-2 rounded-[0.313rem] pl-2" />
                            <button onClick={handleInputTypeToggle} className="text-[12px] font-bold cursor-pointer border rounded-[0.313rem] pl-1 pr-1 hover:bg-[#E8E8E8]">{inputTypeToggle ? "Se kode" : "Skjul kode"}</button>
                        </div>
                        <div className="mt-2 mb-4">
                            <label htmlFor="access" className="font-bold">Tilgang:</label>
                            <select name="access" id="access" className="border rounded-[0.313rem] ml-2 pl-2"> {/* add selected if ? true or false, is that possible? */}
                                <option disabled value="-">{cardData[selected].access ? 'Ja' : 'Nei'}</option>
                                <option value='true'>Ja</option>
                                <option value="false">Nei</option>
                            </select>
                        </div>
                        <div className="flex flex-col items-center mb-4">
                            <Button color={0} title="Lagre endringer" onClick={() => setIsOpen(false)}/>
                        </div> 
                    </form>
                </div>
            </div>
            {/* tabell */}
            <div className="col-span-3 flex flex-col items-center mt-10">
                <table>
                    <thead>
                        <tr>
                            <th>Kort nr.</th> 
                            <th>Eier</th>
                            <th>Kode</th>
                            <th>Tilgang</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>                       
                        {cardData.map((data: any, index: number) => {
                            const [access, setAccess] = useState<string>('Nei');
                            const [type, setType] = useState<string>('password');
                            const [typeToggle, setTypeToggle] = useState<boolean>(true);
                            
                            useEffect(() => {
                                if(data.access === true) {
                                    setAccess("Ja");
                                } else {
                                    setAccess("Nei");
                                }
                            }, [data.access]);

                            const handleTypeToggle = () => {
                                setTypeToggle(!typeToggle);
                                if(typeToggle === true) {
                                    setType('text');
                                } else {
                                    setType('password');
                                }
                            };

                            return(
                                <tr key={index}>
                                    <td>{data.id}</td>{/* Kortnummer */}
                                    <td>{data.name}</td>{/* Eier | \/ kode */}
                                    <td><input type={type} value={data.code} readOnly className="w-10 outline-0" /><button onClick={handleTypeToggle} className="font-bold cursor-pointer border rounded-[0.313rem] pl-1 pr-1 text-[12px] hover:bg-[#E8E8E8]">{typeToggle ? "Se kode" : "Skjul kode"}</button></td>
                                    <td>{access}</td>{/* Tilgang */}
                                    <td><Button color={0} title="Rediger" onClick={() => handlePopUpOpen(index)} /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}