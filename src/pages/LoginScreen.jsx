import React from "react";
import Login from "../components/Login";

function LoginScreen() {
  return (
    <div className="bg-gradient-to-tr from-yellow-500 to-green-800 h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl w-11/12 h-5/6 flex flex-row justify-center overflow-hidden">
        <div className="w-full flex flex-column justify-center">
          <Login />
        </div>
        <div className="bg-login-screen w-full bg-cover bg-center hidden md:block"></div>
      </div>
    </div>
  );
}

export default LoginScreen;
