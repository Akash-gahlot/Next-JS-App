"use client"

import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() { 
    const router = useRouter();

    const [user, setuser] = React.useState({
        email: "",
        password:""
    })   
    const [loginDisable, setloginDisable] = React.useState(true);
    const [loading, setloading] = React.useState(false);
    
    async function onLogin() { 
        try {
            setloading(true);
            setloginDisable(true);        
            const response = await axios.post("api/users/login", user);         
            if (response.status == 201) {   
                setloading(false);
                setloginDisable(false); 
                console.log(response.data.message);
                toast(response.data.message, { autoClose: 2000, type: "warning" });              
            }
            else if (response.status == 200) {
                router.push("/signup");                 
                toast(response.data.message, { autoClose: 2000, type: "success" });
            }
        }
        catch (err:any) {
            setloading(false);
            setloginDisable(false);                       
            toast(err.message, { autoClose: 2000, type: 'error' }) 
        }
        // finally { 

        // }

    }
    useEffect(() => {
         if (user.email.length >= 3 && user.password) { 
            setloginDisable(false);
        }
        if (!user.email || !user.password) { 
            setloginDisable(true);
        }
        
     }, [user]);
    return (
        <div className="text-center p-10">
            <h1>Welcome to Login Page</h1>
            <hr />
            <br />
            <br />     
            {loading ? (<p>Processing...</p>) : (
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        className="text-black"
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={(e) => setuser({ ...user, email: e.target.value })}
                    />
                    <br />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input
                        className="text-black"
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => setuser({ ...user, password: e.target.value })}
                    />
                    <br />
                    <br />
                    <button type="submit" onClick={onLogin} disabled={ loginDisable}>Login</button>
                    <br />
                    <p>New User ? <a href='/signup'>SignUp Here</a></p>
                </div>
            )}
        </div>
    )
}