"use client"
import Header from "@/src/components/header";
import Nav from "@/src/components/nav";
import { useEffect, useState } from "react";
import axios from 'axios';
import Button from "@/src/components/button";
import { fetchUser, admin } from "../libs/authorization";

export default function Brukeradministrering() {
    const [userData, setUserData] = useState<any []>([])
    const [isAddUserPopUpOpen, setIsAddUserPopUpOpen] = useState<boolean>(false);
    const [isEditPopUpOpen, setIsEditPopUpOpen] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<any>({username: '', password: ''});
    const [selected, setSelected] = useState<any>({index: 0, userId: 0, deletion: false, permission: ''});
    // authorization

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
    }, []); // should depend on something so it updates every time a change is made, unless every time i close a popup the window does a reload

    const handleFormValueChange = (e: any) => {
        setFormValues({...formValues, [e.target.name]:e.target.value});
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
            <div className={`grid-cols-5 grid-rows-auto ${admin ? 'grid' : 'grid'}`}>
                <div className="col-span-5 row-span-1">
                    <Header />
                </div>
                <div className="col-span-1">
                    <Nav location="brukeradministrering" />
                </div>
                <div className={`background-popup ${isAddUserPopUpOpen ? 'open' : ''}`}>
                    <div className="bg-white rounded-[0.313rem] w-[20vw] h-[40vh] flex flex-col items-center justify-center relative">
                        <h2 className="font-bold mb-5">Opprett bruker</h2>
                        <button onClick={() => handlePopUpOpen(0)} className="absolute top-0 right-0 mr-4 mt-1 text-4xl font-bold cursor-pointer">x</button>
                        <form onSubmit={handleFormSubmit}>
                            <div className="flex flex-col">
                                <label htmlFor="username" className="font-bold">Brukernavn:</label>
                                <input type="text" name="username" id="username" value={formValues.username} onChange={handleFormValueChange} className="border rounded-[0.313rem] pl-2" required />
                            </div>
                            <div className="mt-2 flex flex-col">
                                <label htmlFor="password" className="font-bold">Passord:</label>
                                <input type="password" name="password" id="password" value={formValues.password} onChange={handleFormValueChange} className="border rounded-[0.313rem] pl-2" required />
                            </div>
                            <div className="mt-5 flex flex-col items-center">
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
                                <button type="submit" onClick={() => setSelected({...selected, deletion: true})} className="pl-2 pr-2 sm:pl-8 sm:pr-8 pt-2.5 pb-2.5 bg-red-700 hover:bg-red-900 text-white font-bold mr-1 rounded-[0.313rem] cursor-pointer">Slett bruker</button>
                                <button type="submit" onClick={() => setSelected({...selected, deletion: false})} className="pl-2 pr-2 sm:pl-8 sm:pr-8 pt-2.5 pb-2.5 bg-(--green) hover:bg-[#00302B] text-white font-bold rounded-[0.313rem] cursor-pointer">Lagre endringer</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Bruker Id</th>
                                <th>Brukernavn</th>
                                <th>Tillatelse</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((data: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.UserId}</td>
                                        <td>{data.Username}</td>
                                        <td>{data.Permission}</td>
                                        <td><Button title='Rediger' color={0} onClick={() => {handlePopUpOpen(1); setSelected({...selected, index: index, userId: data.UserId, permission: data.Permission});}}/></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="mt-5">
                        <Button color={0} title='Legg til ny bruker' onClick={() => handlePopUpOpen(0)} />
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}