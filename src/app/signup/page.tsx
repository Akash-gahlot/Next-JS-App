"use client"

import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function SignupPage() { 
    const router = useRouter();
    const [user, setuser] = React.useState({
        username: "",
        email: "",
        password:""
    }) 
    const [buttonDisable, setbuttonDisable] = React.useState(true);
    const [loading, setloading] = React.useState(false);

    const onSignup = async () => { 
        try {
            setloading(true);
            setbuttonDisable(true);
            const response = await axios.post('api/users/signup', user);
            if (response.status == 201) { 
                //setloading(false);
                router.push("/login");
                toast('Signup Successfull , Now Login Plz.. ', {autoClose: 2000, type: 'success' })
            }
            else if (response.status == 200) {
                setloading(false);
                setbuttonDisable(false);
                toast(response.data.message, { autoClose: 2000, type: 'error' });
            }            
        } catch (err:any) { 
            setloading(false);
            setbuttonDisable(false);            
            toast(err.message, { autoClose: 2000, type: 'error' })            
        } 
        // finally { 
        //      setloading(false);
        //     setbuttonDisable(false);
        // }
    }    
    useEffect(() => {
        if (user.username.length >= 3  && user.password) { 
            setbuttonDisable(false);
        }
        if (!user.username || !user.email || !user.password) { 
            setbuttonDisable(true);
        }
        
    }, [user]);
    return (

        <div className="text-center p-10" >
            <h1>Welcome to Signup Page</h1>
            <hr />
            <br />
            <br />
            {loading ? (<p>Processing...</p>) : (
                <div>
            <label htmlFor="username">UserName</label>
            <input   className="text-black"               
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setuser({...user,username:e.target.value})}
            />  
            <br />
            <br/>
            <label htmlFor="email">Email</label>
            <input   className="text-black"               
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setuser({...user,email:e.target.value})}
            />     
            <br />
            <br/>
            <label htmlFor="password">Password</label>
            <input    className="text-black"            
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setuser({...user,password:e.target.value})}
            />
             <br />
            <br />
                    <button type="submit" onClick={onSignup} disabled={ buttonDisable}>SignUp</button>
            <br />
                    <p>Already User ? <a href='/login'>Login Here</a></p>
                    </div>
            )}
        </div>
    )
}