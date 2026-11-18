
function Login() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Agent Login
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Sign in to access your support dashboard.
        </p>

        <div className="mt-8 space-y-4">

          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">
            Login
          </button>

        </div>
      </div>

    </div>
  );
}

export default Login;
