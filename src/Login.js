import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import { googleUserInfo, postApi } from "../Api/Api";
import { useNavigate } from "react-router-dom";

let getUrl = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

const Login = () => {
  // React Hook Form setup
  const { register, handleSubmit, reset } = useForm();

  // State to handle success or error messages
  const [message, setMessage] = useState("");

  // State to handle login with google user data
  const [user, setUser] = useState(null); // Store user data after successful login
  const [loading, setLoading] = useState({ google: false });

  const navigate = useNavigate();

  // Function to handle the form submission
  const onSubmit = async (data) => {
    setLoading({ ...loading, email: true });
    try {
      const response = await postApi(`/user/login/`, data);
      if (response) {
        if (response?.data?.code === 200) {
          // await login(response?.data?.data);
          // Cookies.set("token", response.data.data.token, {
          //     expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
          //     secure: true,       // Only sent over HTTPS
          //     sameSite: 'Strict'  // Prevent CSRF
          // });
          navigate("/", { state: { from: "/login" }, replace: true });
        }
      }
    } catch (error) {
      setLoading({ ...loading, email: false });
      setMessage("Network error: please try again.");
    }
  };

  /**
   * Google login
   */
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.log("Google login failed:", error),
  });

  useEffect(() => {
    if (!user) return;

    const access_token = user?.access_token;

    if (access_token) {
      const headers = {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      };

      googleUserInfo(getUrl, access_token, headers)
        .then((res) => {
          console.log(res);

          setLoading((prev) => ({ ...prev, google: true }));
          handleGoogleLogin(res?.data, access_token);
        })
        .catch((err) => {
          console.log("Error fetching user info:", err);
          setLoading((prev) => ({ ...prev, google: false }));
        });
    }
  }, [user]);

  const handleGoogleLogin = async (user_profile, google_access_token) => {
    const body = {
      first_name: user_profile?.given_name,
      last_name: user_profile?.family_name,
      email: user_profile?.email,
      google_id: user_profile?.id,
      login_type: "google",
      email_verified: user_profile?.verified_email ? 1 : 0,
      google_access_token: google_access_token,
    };

    try {
      postApi(`/user/`, body).then(async (res) => {
        if (res?.data?.data) {
          // await login(res?.data?.data);
          navigate("/", { state: { from: "/login" }, replace: true });
        } else {
          setLoading((pre) => ({ ...pre, google: false }));
          if (res?.data?.code === 201) {
            console.log(res?.data?.message, "error");
          } else {
            console.log("Failed to login", "error");
          }
        }
      });
    } catch (error) {
      console.error("Error during login request:", error);
      setMessage("Error during login request.");
    } finally {
      setLoading((prev) => ({ ...prev, google: false }));
    }
  };

  return (
    <div>
      <h2>Login User</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input type="email" {...register("email", { required: true })} />
        <label>Password:</label>
        <input type="password" {...register("password", { required: true })} />
        <button type="submit">Login</button>
        OR
        <button onClick={() => googleLogin()}>Sign In with Google</button>
        <button>Login With Wallet</button>
      </form>
    </div>
  );
};

export default Login;
