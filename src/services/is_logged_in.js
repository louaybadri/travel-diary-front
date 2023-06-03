import axios from "axios";

export async function IsLoggedIn(setLoggedIn) {
    const access_token = localStorage.getItem("access_token")
    if(!access_token){
        console.log("false")
        return false
    }
    const res = await axios.get('http://localhost:3000/api/auth/verify', {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }
    ).then(res=>res.data).catch(e=>e.toString())
    console.log("Hello there")
    console.log(res)
    setLoggedIn(true)
    return res
}