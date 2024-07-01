import { ReactNode, createContext, useContext } from "react";
import ToDoRepository from "../services/ToDoRepository";

export const TodoContext = createContext<ToDoRepository | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export const ToDoProvider = ({ children }: ProviderProps) => {
  const toDoRepository = new ToDoRepository();

  return (
    <TodoContext.Provider value={toDoRepository}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};
