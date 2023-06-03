import React, {useEffect, useState} from 'react';
import Post from './post';
import axios from "axios";

function Feed() {

    const [posts,setPosts] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3000/api/posts/all").then(res=>{
            console.log(res.data)
            setPosts(res.data)

        })

    },[])



    return (
        <div className="container">
            <h2 className="mb-4">Feed</h2>
            {posts.map((post, index) => (
                <Post
                    key={index}
                    post={post}
                    user={post.user}
                />
            ))}
        </div>
    );
};

export default Feed;