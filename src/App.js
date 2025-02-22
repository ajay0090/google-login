import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./App.css";

let getUrl = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

function App() {
  // State to handle login with google user data
  const [user, setUser] = useState(null); // Store user data after successful login

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
          handleGoogleLogin(res?.data, access_token);
        })
        .catch((err) => {
          console.log("Error fetching user info:", err);
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
      // Post the data
      console.log("user-data", body);
    } catch (error) {
      console.error("Error during login request:", error);
    }
  };

  const googleUserInfo = async (url, access_token, headers) => {
    return await axios
      .get(`${url}${access_token}`, { headers })
      .then((res) => res)
      .catch((error) => error);
  };

  return (
    <div>
      <button onClick={() => googleLogin()}>Sign In with Google</button>
    </div>
  );
}

export default App;
