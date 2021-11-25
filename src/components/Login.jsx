import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import Google from "../assets/icons/Google";
import Spin from "../assets/icons/Spin";
import { AppContext } from "../context";
import { auth } from "../firebase";
import Logo from "./Logo";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


export default function Login() {
  const [load, setLoad] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const { dispatch } = useContext(AppContext);
  const navigation = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    setLoad(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({ type: "LOGIN", payload: userCredential.user });
        setLoad(false);
        navigation.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorStatus("Login failed, mail or password invalid");
        setLoad(false);
      });
  };

  const handleLoginGoggle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);

      dispatch({ type: "LOGIN", payload: user });
      navigation.push("/");
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  return (
    <form
      className="flex flex-col justify-center w-11/12 md:w-4/6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4 text-center rounded-lg overflow-hidden">
        <Logo />
      </div>
      <div className="flex flex-row justify-start items-center px-4 w-full border-2 rounded-lg border-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <input
          className="w-full ml-2 p-2 focus:outline-none"
          placeholder="Email"
          {...register("email", { required: true })}
        />
      </div>
      {errors.mail && (
        <span className="text-right text-red-500">This field is required</span>
      )}
      <div className="flex flex-row justify-start items-center px-4 w-full border-2 rounded-lg border-gray-100 mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
        <input
          placeholder="Password"
          className="w-full ml-2 p-2 focus:outline-none"
          type="password"
          {...register("password", { required: true })}
        />
      </div>
      {errors.password && (
        <span className="text-right text-red-500">This field is required</span>
      )}
      {errorStatus && (
        <span className="text-right text-red-500">{errorStatus}</span>
      )}
      <div className="flex flex-row justify-between w-full items-center mt-6">
        <div className="flex flex-row">
          <Link to="/register" className="pr-4 text-gray-400">
            Register
          </Link>
          <p className="text-gray-400">Forgot Password</p>
        </div>
        <div>
          <button
            className="text-white bg-indigo-700 rounded-lg py-2 px-4 hover:bg-indigo-800"
            type="submit"
          >
            {!load ? "Sign In" : <Spin />}
          </button>
        </div>
      </div>

      <div className="mx-auto mt-4">
        <button onClick={handleLoginGoggle} className="flex items-center border-2 hover:bg-gray-100 rounded-lg px-4 py-2">
          <span className="mr-2 text-gray-400">Loggin with Google account</span>
          <Google />
        </button>
      </div>
    </form>
  );
}
