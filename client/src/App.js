import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Rotas from "./routes";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Rotas />
      </div>
    </Router>
  );
}

export default App;
