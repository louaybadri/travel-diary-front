import axios from "axios";
import {useNavigate} from "react-router-dom";

export async function LoadProfile(username) {
    const access_token = localStorage.getItem("access_token")
    if (!access_token) {
        return {
            profile: null,
            posts: null
        }
    }
    const profile = await axios.get("http://localhost:3000/api/users/username/" + username, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    })
    if (!profile) {
        return {
            profile: null,
            posts: null
        }
    }
    const posts = await axios.get("http://localhost:3000/api/posts/username/" + username, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    })
    return {
        profile: profile.data,
        posts: posts.data
    }

}