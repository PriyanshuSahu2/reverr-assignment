import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import styles from "./Login.module.css"; // Import the CSS module

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // Login successful, userCredential.user contains user information
      localStorage.setItem("user", { loggedIn: true });
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Login failed");
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.right}>
          <form onSubmit={handleLogin} className={styles.customForm}>
            <h2 className={styles.title}>Login</h2>
            <input
              type="text"
              placeholder="Email or Username"
              onChange={handleChange}
              id="email"
              name="email"
              className={styles.styledFormControl}
            />
            <input
              type="password"
              placeholder="Password"
              hint="At least 8 characters"
              onChange={handleChange}
              id="password"
              name="password"
              className={styles.styledFormControl}
            />
            <button type="submit" className={styles.submitButton}>
              {loading ? "...." : "Login"}
            </button>
            <p className={styles.loginLink}>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
