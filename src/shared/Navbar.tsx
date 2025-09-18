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
    </div>
  );
};

export default Navbar;
