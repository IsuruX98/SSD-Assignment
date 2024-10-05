import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { AuthContextProvider } from "./context/authContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
library.add(faPlay);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <GoogleOAuthProvider clientId="321436167950-pohg17ch3hnlcb11gmeh9eugosb3t04n.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </AuthContextProvider>
);
