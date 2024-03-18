import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from './firebase/config.js';
import "./style.scss";
import { Profile } from "./components/Profile.jsx";

function App() {

  const userAuthenticated = () => {
    return auth.currentUser !== null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
        {userAuthenticated() ? <Navigate to="/home" /> : null}
          <Route
            index
            element={<Home />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;