import React, { useState } from 'react';
import Add from "../img/addAvatar.png";
import Logo from "../img/logo.png";
import "../style.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { auth, db, storage } from "../firebase/config";

export const Register = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    file: null,
  });
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const { displayName, email, password, file } = formData;

    // Perform manual form validation
    if (!displayName || !email || !password || !file) {
      setErr(true);
      setLoading(false);
      return;
    }

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create an unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      // Upload file to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error);
          setErr(true);
          setLoading(false);
        },
        () => {
          // Get download URL of uploaded file
          getDownloadURL(storageRef).then(async (downloadURL) => {
            // Update user profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Create user document in Firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            navigate("/login");
          });
        }
      );
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img className="logo" src={Logo} alt="Logo" />
        <span className="title">Sign up to start listening</span>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="name"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
          />
          <input
            required
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <input
            required
            style={{ display: "none" }}
            type="file"
            id="file"
            name="file"
            onChange={handleInputChange}
          />
          <label htmlFor="file">
            <img src={Add} alt="Add Avatar" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && <span>{`Uploading and compressing the image: ${uploadProgress}%`}</span>}
          {err && <span>Something went wrong 🚫</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
