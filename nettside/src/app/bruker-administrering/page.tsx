"use client";

import Header from "@/src/components/header";
import Nav from "@/src/components/nav";
import { useEffect, useState } from "react";
import axios from 'axios';
import Button from "@/src/components/button";
import { redirect, RedirectType } from "next/navigation";

export default function Brukeradministrering() {
    const [userData, setUserData] = useState<any []>([])
    const [isAddUserPopUpOpen, setIsAddUserPopUpOpen] = useState<boolean>(false);
    const [isEditPopUpOpen, setIsEditPopUpOpen] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<any>({username: '', password: ''});
    const [selected, setSelected] = useState<any>({index: 0, userId: 0, deletion: false, permission: ''});
    const [admin, setAdmin] = useState<boolean>(false);
    // authorization


    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/auth/home', {
                headers: {
                "Authorization" : `Bearer ${token}`
                }
            });
            if (response.data.user.Permission === "admin"){
                setAdmin(true);
            } else {
                setAdmin(false);
            }
            return admin;
        } catch(error) {
            redirect('/logg-inn', RedirectType.replace);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);
    // fetch users for user table
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/auth/users');
            if (response.status === 201) {
                setUserData(response.data.users);
            }
            console.log(response);
        } catch(error) {
            console.log('Failed to fetch users', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [userData]); // should depend on something so it updates every time a change is made, unless every time i close a popup the window does a reload

  const handleFormValueChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/register', formValues);
            if (response.status === 201) {
                setIsAddUserPopUpOpen(false);
            }
        } catch(error) {
            console.log("Failed to register data", error);
        }
        setFormValues({username: '', password: ''});
    };

    const handlePopUpOpen = (where: number) => {
        if (where === 0) {
            setIsAddUserPopUpOpen(!isAddUserPopUpOpen);
        } else if (where === 1) {
            setIsEditPopUpOpen(!isEditPopUpOpen);
        }
        
    };

    const handleUserEdit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/edit-user', selected); 
            if (response.status === 201) {
                console.log('User edited successfully');
            }
            console.log(response);
        } catch(error) {
            console.log('Failed to edit user', error);
        }
    };
    console.log(admin);
    return(
        <div>
            <div className={`grid-cols-5 grid-rows-auto ${admin ? 'grid' : 'hidden'}`}>
                <div className="col-span-5 row-span-1">
                    <Header />
                </div>
                <div className="col-span-1">
                    <Nav location="brukeradministrering" />
                </div>
                <div className={`background-popup ${isAddUserPopUpOpen ? 'open' : ''}`}>
                    <div className="bg-white w-[90%] sm:w-[30%] rounded-xl shadow-lg p-6 flex flex-col">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Opprett bruker</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="flex flex-col">
                                <label htmlFor="username" className="font-semibold text-sm text-gray-700">Brukernavn:</label>
                                <input type="text" name="username" id="username" value={formValues.username} onChange={handleFormValueChange} className="border rounded-md px-2 py-1" required />
                            </div>
                            <div className="mt-2 flex flex-col">
                                <label htmlFor="password" className="font-semibold text-sm text-gray-700">Passord:</label>
                                <input type="password" name="password" id="password" value={formValues.password} onChange={handleFormValueChange} className="border rounded-md px-2 py-1" required />
                            </div>
                            <div className="flex justify-end gap-3 mt-2">
                              <button type="button" onClick={() => handlePopUpOpen(0)} className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100">
                                Avbryt
                              </button>
                                <button type="submit" className='pl-2 pr-2 sm:pl-8 sm:pr-8 pt-2.5 pb-2.5 bg-(--green) hover:bg-[#00302B] rounded-[0.313rem] cursor-pointer'>
                                    <p className="font-bold text-white">Opprett bruker</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={`background-popup ${isEditPopUpOpen ? 'open' : ''}`}>
                    <div className="flex flex-col items-center justify-center w-[30vw] h-[35vh] rounded-[0.313rem] bg-(--background) relative">
                        <h2 className="font-bold">Rediger bruker</h2>
                        <button onClick={() => handlePopUpOpen(1)} className="absolute top-0 right-0 mr-4 mt-1 text-4xl font-bold cursor-pointer">x</button>
                        <form onSubmit={handleUserEdit}>
                            <div className="mt-2 flex flex-row">
                                <p className="font-bold">Brukernavn:</p>
                                <p className="ml-2">{userData[selected.index]?.Username}</p>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="permission" className="font-bold">Tillatelse:</label>
                                <select name="permission" id="permission" onChange={(e: any) => setSelected({...selected, permission: e.target.value})} value={selected.permission} className="ml-2 pl-2 border-2 rounded-[0.313rem]">
                                    <option disabled>{selected.permission}</option>
                                    <option value="admin">admin</option>
                                    <option value="readOnly">read only</option>
                                </select>
                            </div>
                            <div className="flex flex-row mt-4">
                                <button type="submit" onClick={() => {setSelected({...selected, deletion: true}); handlePopUpOpen(1)}} className="pl-2 pr-2 sm:pl-8 sm:pr-8 pt-2.5 pb-2.5 bg-red-700 hover:bg-red-900 text-white font-bold mr-1 rounded-[0.313rem] cursor-pointer">Slett bruker</button>
                                <button type="submit" onClick={() => {setSelected({...selected, deletion: false}); handlePopUpOpen(1)}} className="pl-2 pr-2 sm:pl-8 sm:pr-8 pt-2.5 pb-2.5 bg-(--green) hover:bg-[#00302B] text-white font-bold rounded-[0.313rem] cursor-pointer">Lagre endringer</button>
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
                              Bruker Id
                            </th>
                            <th className="px-4 py-3 text-xs text-gray-400">
                              Brukernavn
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
                        {data.UserId}
                      </td>

                      <td className="px-4 py-3">
                        {data.Username}
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold px-2 py-1 rounded-md bg-green-100 text-green-700">
                          {data.Permission}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <Button title="Rediger" color={0} onClick={() => {handlePopUpOpen(1); setSelected({...selected, index: index, userId: data.UserId, permission: data.Permission});}} />
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
                onClick={() => handlePopUpOpen(0)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}