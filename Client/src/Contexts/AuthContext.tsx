import { User } from "firebase/auth";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../Utils/firebase";
import Authenticate from "../Pages/Authenticate/Authenticate";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextProps = {
  currentUser: User | null;
  openAuth: () => void;
  closeAuth: () => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const openAuth = () => setIsOpen(true);
  const closeAuth = () => setIsOpen(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    const timeoutId = setTimeout(() => {
      setShowLoading(false);
    }, 1500);

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading || showLoading) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, openAuth, closeAuth }}>
      {isOpen && <Authenticate close={closeAuth} />}
      {children}
    </AuthContext.Provider>
  );
};
