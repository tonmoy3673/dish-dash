import { ShoppingCart } from "lucide";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      {/* ========= Logo ======= */}
      <div>
        <img
          src="../../public/images/logo.png"
          className="rounded-full w-22 bg-amber-50 cursor-pointer hover:bg-amber-200"
        />
      </div>
      {/* ============= nav ===== */}
      <nav className="mx-auto flex gap-x-5">
        {/* ================ Home =========== */}
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-500" : "text-gray-800"
            } hover:text-amber-500`
          }
          to="/"
        >
          Home
        </NavLink>
        {/* ============ About ========= */}
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-500" : "text-gray-800"
            } hover:text-amber-500`
          }
          to="about"
        >
          About
        </NavLink>
        {/* ============== feedback ======= */}
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-500" : "text-gray-800"
            } hover:text-amber-500`
          }
          to="feedback"
        >
          Feedback
        </NavLink>
      </nav>

      {/* ============ add to cart button ========== */}
      <div className="hover:bg-amber-300 p-4 rounded-full cursor-pointer transition-transform duration-300 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
        <p className="absolute top-[-2px] right-[23px]">0</p>
      </div>
    </div>
  );
};

export default Navbar;
