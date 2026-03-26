"use client"
import Header from "@/src/components/header";
import Nav from "@/src/components/nav";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import Button from "@/src/components/button";

export default function Brukeradministrering() {
    const [userData, setUserData] = useState<any []>([{username: '2inf', password: 'testing', access: 'admin'}, {username: '2del', password: 'testing', access: 'admin'}])
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<any>({username: '', password: ''});
    const router = useRouter();
    // authorization
    const fetchUser = async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/auth/home', {
            headers: {
            "Authorization" : `Bearer ${token}`
            }
        });
        } catch(error) {
       // router.push('/logg-inn');//
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleFormValueChange = (e: any) => {
        setFormValues({...formValues, [e.target.name]:e.target.value});
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/register', formValues);
            if (response.status === 201) {
                setIsOpen(false);
            }
        } catch(error) {
            console.log("Failed to register data", error);
        }
        setFormValues({username: '', password: ''});
    };

    const handlePopUpOpen = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div className="grid grid-cols-5 grid-rows-auto">
            <div className="col-span-5 row-span-1">
                <Header />
            </div>
            <div className="col-span-1">
                <Nav location="brukeradministrering" />
            </div>
            <div className={`background-popup ${isOpen ? 'open' : ''}`}>
                <div className="bg-white rounded-[0.313rem] w-[20vw] h-[40vh] flex flex-col items-center justify-center relative">
                    <h2 className="font-bold mb-5">Opprett bruker</h2>
                    <button onClick={handlePopUpOpen} className="absolute top-0 right-0 mr-4 mt-1 text-4xl font-bold cursor-pointer">x</button>
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
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Brukernavn</th>
                            <th>Passord??</th>
                            <th>Tilgang</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((data: any, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{data.username}</td>
                                    <td><input type="password" readOnly value={data.password} /></td>
                                    <td>{data.access}</td>
                                    <td><Button title='Rediger' color={0}/></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="mt-5">
                    <Button color={0} title='Legg til ny bruker' onClick={handlePopUpOpen} />
                </div>
            </div>
        </div>
    );
}