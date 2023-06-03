import React, {useEffect, useState} from 'react';
import './styles/profile.css';
import Post from './post'
import {IsLoggedIn} from "../services/is_logged_in";
import {useNavigate, useParams} from "react-router-dom";
import {LoadProfile} from "../services/load_profile";
import axios from "axios";

function MyProfile() {
    const { anyUsername } = useParams()
    const [userData, setUserData] = useState()
    const [userProfile, setUserProfile] = useState()
    const [userPosts, setUserPosts] = useState()
    const [username, setUsername] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    const loadData = async (_setData) => {
        const result = await IsLoggedIn()
        if (!result.token_valid) {
            navigate("/signin");
        } else {
            const {profile, posts} = await LoadProfile(result.user.username)
            _setData(profile)
        }
    }

    const navigate = new useNavigate()
    useEffect(
        () => {

            const access_token = localStorage.getItem("access_token")
            if (!access_token) {
                console.log("false")
                navigate("/signin")
                setLoggedIn(false)
            } else {
                axios.get('http://localhost:3000/api/auth/verify', {
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        }
                    }
                ).then(res => {
                   setLoggedIn(res.data.token_valid)

                    setUserData(res.data)
                    // console.log("res.data")
                    // console.log(res.data)
                    setUsername(res.data.user.username)
                    const _username = anyUsername?anyUsername:res.data.user.username
                    axios.get("http://localhost:3000/api/users/username/" + _username, {
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        }
                    }).then(res => {
                        // console.log(res.data)
                        setUserProfile(res.data)
                    }).catch(e => {
                        localStorage.removeItem("access_token")
                        navigate("/signin")
                    })

                    axios.get("http://localhost:3000/api/posts/username/" +_username, {
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        }
                    }).then(res => {
                        console.log(res.data)
                        setUserPosts(res.data)
                    })
                }).catch(error => {
                    // Handle error
                    if (error.response && error.response.status === 401) {
                        // Unauthorized error
                        console.log('Unauthorized');

                        navigate("/signin")
                        // Redirect to login or perform other actions
                    } else {
                        // Other error
                        console.log('An error occurred:', error.message);
                    }
                })

            }
        }
        , [])

    return (<>{userData && userProfile && userPosts ?
            <div className="profile">
                <h1 onClick={
                    () => {
                        console.log(userData)
                        console.log(userProfile)
                        console.log(userPosts[0].title)
                        console.log("userId",anyUsername)
                        console.log(userProfile.coverPhoto)
                    }
                }>LOG DATA</h1>
                <div className="profile-header">
                    <img
                        src={'http://localhost:3000/uploads/'+userProfile.coverPhoto}
                        alt="Cover" className="cover-image"/>
                    <div className="avatar-container">
                        <img
                            src={'http://localhost:3000/uploads/'+userProfile.avatar}
                            alt="Avatar" className="avatar-image"/>
                    </div>
                </div>
                <div className="profile-info">
                    <h2 className="username">{userProfile.username}</h2>
                    <p className="name">
                        {userProfile.firstname} {userProfile.lastname}
                    </p>
                    <p className="bio">{userProfile.bio}</p>
                </div>

                <h3 className="post-heading">Posts</h3>
                {userPosts? userPosts.map((post, index) => (
                    <Post key={index} post={post} user={userProfile} />
                )):<h2>No posts here</h2>}
            </div> : <p>Loading...</p>}</>
    )
};

export default MyProfile;