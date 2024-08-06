import { ReactNode } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = (props: Props) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to={"/"} state={{ openAuth: true }} />;
  }
  return props.children;
};

export default ProtectedRoute;
