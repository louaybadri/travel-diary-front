import React, {useEffect} from 'react'
import { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
export default function SignUp() {

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [coverImagePreview, setCoverImagePreview] = useState(null);
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false)

    const navigate = new useNavigate()
    const handleFileChange = (event,type) => {

        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            if(type ==="avatar"){
                setAvatarPreview(URL.createObjectURL(file));
            setAvatar(file)}
            if(type==="coverPhoto"){
                setCoverImagePreview(URL.createObjectURL(file));
            setCoverImage(file)
            }
        }
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("username", username)
        formData.append("firstname", firstname)
        formData.append("lastname", lastname)
        formData.append("bio", bio)
        formData.append("mail", email)
        formData.append("password", password)
        formData.append("avatar", avatar)
        formData.append("coverPhoto", coverImage)
        await axios.post("http://localhost:3000/api/auth/register", formData).then(res => {
            console.log(res.data)
            navigate("/profile")
        }).catch(e => {
            console.log(e)
        })
        // Perform registration logic here
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
    return (
        <div className="container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label" htmlFor="avatar">Avatar:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="avatar"
                        accept="image/*"
                        onChange={(e) => {
                            handleFileChange(e,"avatar")
                        }
                        }
                    />
                    {avatarPreview && <img src={avatarPreview} width={"50px"} alt="Preview" />}
                </div>
                <div>
                    <label htmlFor="coverImage">Cover Image:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="coverImage"
                        accept="image/*"
                        onChange={(e) =>
                        {
                            handleFileChange(e,"coverPhoto")
                        }}
                    />

                    {coverImagePreview && <img src={coverImagePreview} width={"100px"} alt="Preview" />}
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="firstname">First Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        className="form-control"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>

            </form></div>
    );
}
