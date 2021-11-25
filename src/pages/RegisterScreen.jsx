import React from "react";
import Register from "../components/Register";

function RegisterScreen() {
  return (
    <div className="bg-gradient-to-tr from-green-200 to-blue-500 h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl w-11/12 h-5/6 flex flex-row justify-center overflow-hidden">
        <div className="bg-register-screen w-full bg-cover bg-center hidden md:block"></div>
        <div className="w-full flex flex-column justify-center">
          <Register />
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
