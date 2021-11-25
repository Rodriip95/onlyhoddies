import React from "react";
import { useHistory } from "react-router";

function Logo() {
  const navigation = useHistory()
  return (
    <h1 onClick={()=>navigation.push('/')} className="text-4xl px-2 pt-1 bg-indigo-500 font-principal font-extrabold text-white cursor-pointer">
      OnlyHoddies
    </h1>
  );
}

export default Logo;
