
function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold text-gray-900">
        Agent Dashboard
      </h1>

      <p className="mt-3 text-gray-600">
        Manage customer support tickets from one place.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">
            Total Tickets
          </h2>

          <p className="mt-3 text-3xl font-bold text-indigo-600">
            0
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">
            Open Tickets
          </h2>

          <p className="mt-3 text-3xl font-bold text-orange-500">
            0
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">
            Resolved Tickets
          </h2>

          <p className="mt-3 text-3xl font-bold text-green-600">
            0
          </p>
        </div>

      </div>

      <div className="mt-8 rounded-xl border bg-white p-8 text-center">

        <h2 className="text-xl font-semibold">
          No tickets available
        </h2>

        <p className="mt-2 text-gray-500">
          Customer tickets will appear here.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;
