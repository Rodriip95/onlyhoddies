import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "@firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../context";
import { auth } from "../firebase";
import Logo from "./Logo";

export default function Register() {
  const [load, setLoad] = useState(false);
  const { dispatch } = useContext(AppContext);

  const navigation = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password, name }) => {
    setLoad(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => userCredential.user)
      .then((user) => {
        // Signed in
        const userCurrent = auth.currentUser;
        updateProfile(userCurrent, { displayName: name })
        .then( response => {
          dispatch({ type: "LOGIN", payload: user });
          setLoad(false);
          navigation.push("/");
        })
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          setLoad(false);
          return alert("This mail already in use.");
        }
        setLoad(false);
        return alert("Error in register! Try again.");
      });
  };

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
          placeholder="Name"
          {...register("name", { required: true })}
        />
      </div>
      {errors.name && (
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <input
          className="w-full ml-2 p-2 focus:outline-none"
          placeholder="Email"
          {...register("email", { required: true })}
        />
      </div>
      {errors.email && (
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

      <div className="flex flex-col w-full items-center justify-center mt-6">
        <div className="w-4/5">
          <button
            className="text-white bg-indigo-700 rounded-lg py-2 px-4 w-full hover:bg-indigo-800"
            type="submit"
          >
            {!load ? (
              "Sign Up"
            ) : (
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="spinner"
                class="svg-inline--fa fa-spinner fa-w-16 h-5 w-5 animate-spin mx-auto"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
                ></path>
              </svg>
            )}
          </button>
        </div>
        <div className="mt-2">
          <Link to="/login" className="text-gray-400">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
