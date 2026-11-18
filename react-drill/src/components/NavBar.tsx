
import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">
          DeskTickets
        </h1>

        <div className="flex gap-3">
          <NavLink to="/" end className={linkStyle}>
            Board
          </NavLink>

          <NavLink to="/new" className={linkStyle}>
            New Ticket
          </NavLink>

          <NavLink to="/about" className={linkStyle}>
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
