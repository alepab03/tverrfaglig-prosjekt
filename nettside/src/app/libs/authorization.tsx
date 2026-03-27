import axios from 'axios';
import { redirect, RedirectType } from "next/navigation";

export let admin: boolean;

export const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/auth/home', {
                headers: {
                "Authorization" : `Bearer ${token}`
                }
            });
            console.log(response);
            if (response.data.user.Permission === "admin"){
                admin = true;
            } else {
                admin = false;
            }
            return admin;
        } catch(error) {
            redirect('/logg-inn', RedirectType.replace);
        }
};

