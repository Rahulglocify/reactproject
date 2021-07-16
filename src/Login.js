import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Header from "./Header";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            history.push("/add-product")
        }
    }, [])

   async function login() {
        const item = { email, password }
      let result = await fetch('http://127.0.0.1:8000/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result));
        history.push("/add-product")
    }
    return (
        <>
            <Header />
            <div className="col-sm-6 offset-sm-3">
                <h1>Login</h1>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" /> <br />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" /> <br />
                <button className="btn btn-primary" onClick={login}>Login</button>
            </div>
        </>
    );
}

export default Login;
