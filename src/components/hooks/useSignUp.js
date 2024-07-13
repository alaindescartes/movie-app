import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../config/axios";
import { useAuth } from "../context/authContext";

function useSignUp() {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (values, onSuccess) => {
    if (values.password !== values.passwordConfirm) {
      return setError("you are not the same");
    }

    try {
      setError(null);
      setLoading(true);
      const res = await api.post(
        "http://localhost:8000/api/auth/signUp",
        values
      );
      if (res.status === 201) {
        toast.success("Registration successful");
        login(res.data.token, res.data.user);
        onSuccess();
      } else if (res.status === 400) {
        setError(res.data.message);
      } else {
        setError("registration failed");
      }
    } catch (error) {
      //message.error(error);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return { loading, registerUser, error };
}

export default useSignUp;
