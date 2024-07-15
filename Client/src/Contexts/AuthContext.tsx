import { User } from "firebase/auth";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { auth } from "../Utils/firebase";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextProps = {
  currentUser: User | null;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext || {};

  return { currentUser };
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  const onAuthStateChanged = (user: User | null) => {
    setCurrentUser(user);
    setLoading(false);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        onAuthStateChanged(user);
      } else {
        onAuthStateChanged(null);
      }
    });
    const timeoutId = setTimeout(() => {
      setShowLoading(false);
    }, 1500);
    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);
  if (
    loading ||
    showLoading ||
    (currentUser && currentUser?.uid === undefined)
  ) {
    return <>Loading...</>;
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
