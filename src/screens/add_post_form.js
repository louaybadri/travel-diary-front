import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AddPostForm() {
    const navigate = new useNavigate()
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false)
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        for (const image of images) {
            formData.append("files", image)
        }
        formData.append("title", title)
        formData.append("text", text)
        formData.append("location", location)
        const access_token = localStorage.getItem("access_token")

        await axios.post("http://localhost:3000/api/posts/", formData,{

            headers: {
                'Authorization': 'Bearer ' + access_token
            },
        }).then(res => {
            console.log(res.data)
            navigate("/profile")
        }).catch(e => {
            console.log(e)
        })

        // Perform post creation logic here
        // You can send the form data to an API or handle it in any way you prefer
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);

        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        const imagePreviews = imageFiles.map(file => URL.createObjectURL(file));
        setImagesPreview(imagePreviews);
        const selectedImages = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
        // console.log(selectedImages)
        setImages(selectedImages);
    };

    useEffect(() => {
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
                if(!res.data.token_valid){
                    navigate("/signin")
                }
            })
        }
    }, [])
    return (<>{loggedIn?
        <div className="container">
            <h2 className="mb-4">Add Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Text:</label>
                    <textarea
                        className="form-control"
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="images" className="form-label">Images:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                    {imagesPreview && imagesPreview.map((image, index) => {
                        return (
                            <img key={index} src={image} width={"50px"} alt="Preview"/>)
                    })}

                </div>
                {images.length > 0 && (
                    <div className="mb-3">
                        <label>Selected Images:</label>
                        <ul>
                            {images.map((image, index) => (
                                <li key={index}>{image.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Add Post</button>

            </form>
        </div>:<h1>You Have TO LOG IN BROO</h1>}</>
    );
};

export default AddPostForm;
