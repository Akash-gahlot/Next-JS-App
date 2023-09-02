"use client"

import { useEffect } from "react"
import React from "react"
import axios from "axios"
import { toast } from "react-toastify"

interface User {
  name: any;
  email: any;
}

export default function Mydetails(params: any) {
    const [user, setuser] = React.useState<User>({
        name: '',
        email: '',
});
    const [loading, setloading] = React.useState(true);
    const id = params.params.id;
    async function userDetail() {
        try {
            const response = await axios.post("/api/users/profile", {
                id                
            });
            if (response.status == 200) {
                setuser({
                      name: response.data.user.username,
                    email: response.data.user.email,
                });
                setloading(false);
            }
        }
        catch (err) {
            console.log("exception on page : " + err);
            toast("User doesn't exist ", { autoClose: 200, type: "error" });
            setloading(false);
        }
    }
    useEffect(() => {
        userDetail();
    }, [])
    return (
        <div>
            <h1>Welcome to User Profile Page</h1>
            <br />
            <br />
            {loading ? (<h1>Loading User Details...</h1>) : (  
                <div>{ user.name?(
                    <div>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </div>) : (<h1>User Doesnt Exist</h1>
                )}
                </div>
            )}
     </div >   
    )
    }