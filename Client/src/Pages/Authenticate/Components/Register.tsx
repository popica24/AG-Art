import { useState } from "react";
import CreateAccount from "./CreateAccount";
import CompleteAccount from "./CompleteAccount";
type Props = {
  setLogin: () => void;
};
const Register = (props: Props) => {
  const [panel, setPanel] = useState(1);
  const nextPanel = () => {
    setPanel(2);
  };
  if (panel == 1) {
    return <CreateAccount nextPanel={nextPanel} setLogin={props.setLogin} />;
  }
  if (panel == 2) {
    return <CompleteAccount />;
  }
};

export default Register;
