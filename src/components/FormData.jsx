import React, { useState } from "react";
import { useForm } from "react-hook-form";

function FormData() {
  // Estados y variables
  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    contraseña: "",
    contraseña_confirm: "",
  });
  const { register, handleSubmit } = useForm();

  // Funciones
  const handlerChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handlerClick = (e) => {
    e.preventDefault();
    console.log(state);
  };

  const onSubmit = (data) => console.log(data);

  // Retorno HTML + Js
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      {/* <input type="text" value={state.nombre} name="nombre" onChange={handlerChange} placeholder="Ingrese su nombre..."/>
            <input type="text" value={state.apellido} name="apellido" onChange={handlerChange} placeholder="Ingrese su apellido..."/>
            <input type="text" value={state.email} name="email" onChange={handlerChange} placeholder="Ingrese su mail..."/>
            <input type="text" value={state.telefono} name="telefono" onChange={handlerChange} placeholder="Ingrese su telefono..."/>
            <input type="password" value={state.contraseña} name="contraseña" onChange={handlerChange} placeholder="Ingrese su contraseña..."/>
            <input type="password" value={state.contraseña_confirm} name="contraseña_confirm" onChange={handlerChange} placeholder="Confirmar contraseña..."/> */}
      <button onClick={handlerClick} type="submit">
        Enviar
      </button>
    </form>
  );
}

export default FormData;

// Nombre
// Apellido
// Email
// Telefono
// Password
// Confirmar password
