
import { NavLink } from "react-router";

function Navbar() {
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="border-b bg-white shadow-sm">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <NavLink
          to="/"
          className="text-xl font-bold text-indigo-600"
        >
          TicketDesk
        </NavLink>

        <div className="flex items-center gap-2">

          <NavLink
            to="/"
            end
            className={navLinkStyle}
          >
            Submit a Ticket
          </NavLink>

          <NavLink
            to="/login"
            className={navLinkStyle}
          >
            Agent Login
          </NavLink>

          <NavLink
            to="/dashboard"
            className={navLinkStyle}
          >
            Dashboard
          </NavLink>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
