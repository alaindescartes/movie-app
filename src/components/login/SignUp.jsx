import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSignUp from "../hooks/useSignUp";
import styles from "./Signup.module.css"; // Import CSS module

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { loading, registerUser, error } = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return; // Prevent multiple submissions

    await registerUser(
      {
        username,
        email,
        password,
        passwordConfirm,
      },
      () => {
        navigate("/");
      }
    );
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.header}>Sign Up</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="passwordConfirm" className={styles.label}>
            Confirm Password:
          </label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          Sign Up
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default SignUp;
