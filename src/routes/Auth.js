import AuthForm from "components/AuthForm";
import { authService } from "fBase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import React from "react";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <FaTwitter color={"#04AAFF"} size="3x" style={{ marginBottom: 30 }} />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google
          <FaGoogle />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FaGithub />
        </button>
      </div>
    </div>
  );
};

export default Auth;
