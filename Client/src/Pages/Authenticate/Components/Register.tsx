import { useEffect, useState } from "react";
import CreateAccount from "./CreateAccount";
import CompleteAccount from "./CompleteAccount";
type Props = {
  setLogin: () => void;
  close: () => void;
};
const Register = (props: Props) => {
  const [panel, setPanel] = useState(1);
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);
  const nextPanel = () => {
    setPanel(2);
  };
  if (panel == 1) {
    return (
      <CreateAccount
        nextPanel={nextPanel}
        setLogin={props.setLogin}
        close={props.close}
      />
    );
  }
  if (panel == 2) {
    return <CompleteAccount close={props.close} />;
  }
};

export default Register;
