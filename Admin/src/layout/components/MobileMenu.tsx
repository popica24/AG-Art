import { Link } from "react-router-dom";

const MobileMenu = () => {
  return (
    <label
      className="relative z-[9999] cursor-pointer px-3 py-6 md:hidden block"
      htmlFor="mobile-menu"
    >
      <input className="peer hidden" type="checkbox" id="mobile-menu" />
      <div className="relative z-[9999] block h-[1px] w-7 bg-white bg-transparent content-[''] before:absolute before:top-[-0.35rem] before:z-[9999] before:block before:h-full before:w-full before:bg-[#F7EDE3] before:transition-all before:duration-200 before:ease-out before:content-[''] after:absolute after:right-0 after:bottom-[-0.35rem] after:block after:h-full after:w-full after:bg-[#F7EDE3] after:transition-all after:duration-200 after:ease-out after:content-[''] peer-checked:bg-transparent before:peer-checked:top-0 before:peer-checked:w-full before:peer-checked:rotate-45 before:peer-checked:transform after:peer-checked:bottom-0 after:peer-checked:w-full after:peer-checked:-rotate-45 after:peer-checked:transform"></div>
      <div className="fixed inset-0 z-[9999] hidden h-full w-full bg-[#F7EDE3]/50 backdrop-blur-sm peer-checked:block">
        &nbsp;
      </div>
      <div className="fixed top-0 right-0 z-[9999] h-full w-full translate-x-full overflow-y-auto overscroll-y-none transition duration-500 peer-checked:translate-x-0">
        <div className="float-right min-h-full w-[85%] bg-black px-6 pt-12 shadow-2xl">
          <menu className="text-white">
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/todo">ToDo</Link>
            </li>
            <li>
              <Link to="/catalogue">Catalogue</Link>
            </li>
            <li>
              <Link to="/discounts">DiscountManager</Link>
            </li>
            <li>
              <Link to="/coupons">CouponManager</Link>
            </li>
            <li>
              <Link to="/clients">Clients</Link>
            </li>
            <li>
              <Link to="/banners">Banners</Link>
            </li>
            <li>
              <Link to="/carousel">Carousel</Link>
            </li>
          </menu>
        </div>
      </div>
    </label>
  );
};

export default MobileMenu;
