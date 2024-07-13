import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import styles from "./LoginFormStyles.module.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message); // Set the error message
    }
  };

  return (
    <div className={styles.container}>
      <h1>Not sure what to watch? We've got you!</h1>
      <div className={styles.loginForm}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.actions}>
            <button type="submit" className={styles.button}>
              Log In
            </button>
            <div className={styles.access}>
              <Link to="/forgot-password" className={styles.forgotPassword}>
                Forgot password?
              </Link>
              <Link to="/signUp" className={styles.forgotPassword}>
                Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
