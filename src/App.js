import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./screens/navbar";
import MyProfile from "./screens/myProfile";
import SignIn from "./screens/sign_in";
import SignUp from "./screens/sign_up";
import AddPost from "./screens/add_post_form";
import Feed from "./screens/feed";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdatePostForm from "./screens/update_post_form";
function App() {
  const [showNavbar, setShowNavbar] = useState(true);

  function toggleNavbar() {
    setShowNavbar(!showNavbar);
  }

  return (

    <BrowserRouter>
      <Navbar showNavbar={showNavbar} toggleNavbar={toggleNavbar} />
      <Routes>
        <Route exact path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:anyUsername/" element={<MyProfile />} />
        <Route path="/update_post/:postId/" element={<UpdatePostForm />} />
        <Route path="/profile/" element={<MyProfile />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
