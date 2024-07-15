import { useState } from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";

const Authenticate = () => {
  const [panel, setPanel] = useState(1);
  const setRegiser = () => {
    setPanel(2);
  };
  const setLogin = () => {
    setPanel(1);
  };
  if (panel == 1) {
    return <Login setRegister={setRegiser} />;
  }
  if (panel == 2) {
    return <Register setLogin={setLogin} />;
  }
};

export default Authenticate;
