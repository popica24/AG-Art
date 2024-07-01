import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileMenu from "./components/MobileMenu";
const Layout = () => {
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col md:grid grid-cols-6">
        <div className="col-span-1 hidden md:block">
          <Sidebar />
        </div>
        <div className="block md:hidden bg-black">
          <MobileMenu />
        </div>
        <div className="col-span-5 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
