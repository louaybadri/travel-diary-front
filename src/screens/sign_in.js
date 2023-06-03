import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false)

    const navigate = new useNavigate()
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform sign-in logic here
        await axios.post("http://localhost:3000/api/auth/login",{

            "mail":email,
            "password":password
        }).then(res=>{
            if(res.data.login_state){
                console.log("logged in")
                setLoggedIn(true)
                localStorage.setItem("access_token",res.data.access_token)
            }
        }).catch(e=>{

                alert("wrong credentials")

        })
        // You can send the form data to an API or handle it in any way you prefer
    };
    useEffect(() => {
        const access_token = localStorage.getItem("access_token")
        if (!access_token) {
            console.log("LOGGED IN FALSE")
            setLoggedIn(false)
        } else {
            axios.get('http://localhost:3000/api/auth/verify', {
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    }
                }
            ).then(res => {


                    if (res.data.token_valid) {

                        navigate("/profile")
                        setLoggedIn(true)
                    }
                }
            ).catch(error => {
                // Handle error
                if (error.response && error.response.status === 401) {
                    // Unauthorized error
                    console.log('Unauthorized');
                    setLoggedIn(false)
                    // Redirect to login or perform other actions
                } else {
                    // Other error
                    console.log('An error occurred:', error.message);
                }
            })
        }
    }, [])
    return (<>


            {!loggedIn?
        <div className="container">
            <h2 className="mb-4">Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        </div>:<Navigate to={"/profile"}></Navigate>
            }
                </>
    );
};

export default SignIn;
