"use client"

import React from "react";

export default function LoginPage() { 
    const [user, setuser] = React.useState({
        email: "",
        password:""
    })   
    function onLogin() { 

    }
    return (
        <div className="text-center">
            <h1>Welcome to Login Page</h1>
            <hr />
            <br />
            <br/>           
            <label htmlFor="email">Email</label>
            <input                
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setuser({...user,email:e.target.value})}
            />     
            <br />
            <br/>
            <label htmlFor="password">Password</label>
            <input                
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setuser({...user,password:e.target.value})}
            />
            <br />
            <br />
            <button type="submit" onClick={onLogin}>Login</button>
            <br />
            <p>New User ? <a href='/signup'>SignUp Here</a></p>
        </div>
    )
}