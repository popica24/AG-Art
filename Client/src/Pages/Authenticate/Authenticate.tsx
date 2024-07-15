import { useState } from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";

type Props = {
  close: () => void;
};

const Authenticate = (props: Props) => {
  const [panel, setPanel] = useState(1);
  const setRegiser = () => {
    setPanel(2);
  };
  const setLogin = () => {
    setPanel(1);
  };

  if (panel == 1) {
    return <Login setRegister={setRegiser} close={props.close} />;
  }
  if (panel == 2) {
    return <Register setLogin={setLogin} close={props.close} />;
  }
};

export default Authenticate;
