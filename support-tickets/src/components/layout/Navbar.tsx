
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { session, agent } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-indigo-500/10 text-indigo-400"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-lg font-bold text-white">
            T
          </div>

          <span className="text-xl font-bold tracking-tight text-white">
            TicketDesk
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/" end className={navLinkClass}>
            Submit a Ticket
          </NavLink>

          {session ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

              <span className="px-2 text-sm font-medium text-white">
                {agent?.name ?? session.user.email}
              </span>

              <button
                type="button"
                onClick={() => {}}
                className="rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
              >
                Sign out
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              Agent Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
