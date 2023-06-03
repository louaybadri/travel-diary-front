import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Post({post, user}) {
    const navigate = new useNavigate()
    const [username, setUsername] = useState()
    const [loggedIn, setLoggedIn] = useState(false)

    async function handleDeletePost(id) {
        await axios.delete("http://localhost:3000/api/posts/" + id).then(res => {
            navigate("/profile")
        })
    }


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

                    setUsername(res.data.user.username)

                    // console.log("user.data")
                    // console.log(res.data.user)
                    // console.log(user)
                }).catch(e=>{
                    console.log(e)
                })
            }
        }

        , []
    )

    return (<>{post.id && post.title && post.text && post.location && post.image ?
            <div className="card mb-4">
                <h1 onClick={
                    () => {
                        console.log(post)
                    }
                }>LOG DATA</h1>
                {post.image.length > 0 && (
                    <div id={"carouselExampleIndicators"} className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {post.image.map((image, index) => (
                                <div className={` active `} key={index}>

                                    <img src={"http://localhost:3000/uploads/" + image.image} className="d-block w-100"
                                         alt={`Image ${index}`}/>
                                </div>
                            ))}
                        </div>

                    </div>
                )}
                <div className="card-body">
                    <h4 className="card-title" onClick={
                        () => {
                            navigate("/profile/" + user.username)
                        }
                    }>{user.username}</h4>
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.text}</p>
                    <p className="card-text"><small className="text-muted">{post.location}</small></p>
                    {username===user.username? <><button
                        className="btn btn-danger"
                        onClick={() => handleDeletePost(post.id)}
                    >
                        Delete Post
                    </button> <button
                        className="btn btn-success"
                        onClick={() => {
                            navigate("/update_post/"+post.id)
                        }}
                    >
                        Update
                    </button></>: <></>}
                </div>
            </div>
            : <p>Eli yestana 5ir meli ytmana</p>
        }
        </>
    );
};

export default Post;
