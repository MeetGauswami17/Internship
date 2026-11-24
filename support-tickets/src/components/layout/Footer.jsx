
function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="text-sm font-semibold text-slate-300">
          TicketDesk
        </p>

        <p className="text-xs text-slate-500">
          Built by you - React, Tailwind, Supabase and Gemini
        </p>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} TicketDesk
        </p>
      </div>
    </footer>
  );
}

export default Footer;
