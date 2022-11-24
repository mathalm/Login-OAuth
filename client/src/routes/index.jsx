import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import InitialPage from "../components/InitialPage";
import Login from "../components/Login";

function Rotas() {
  return (

    <Routes >
      <Route path="/" element={<Login />}/>
      <Route path="/InitialPage" element={<InitialPage/>}/>

    </Routes >
  )
}

export default Rotas;