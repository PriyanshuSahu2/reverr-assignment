import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { toast } from "react-toastify";
import styles from "./Register.module.css"; // Import the CSS module

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      // Create a new user with email and password
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      toast.success("Registration successful");
      navigate("/");
    } catch (error) {
      // Handle registration errors, e.g., display an error message
      console.error("Registration error:", error);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.right}>
          <form onSubmit={handleSubmit} className={styles.customForm}>
            <h2 className={styles.title}>Register</h2>

            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onChange={handleChange}
              className={styles.styledFormControl}
            />
            <input
              type="password"
              placeholder="Password"
              hint="At least 8 characters"
              id="password"
              name="password"
              onChange={handleChange}
              className={styles.styledFormControl}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              className={styles.styledFormControl}
            />
            <button type="submit" className={styles.submitButton}>
              {loading ? "..." : "Register"}
            </button>
            <p className={styles.loginLink}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
