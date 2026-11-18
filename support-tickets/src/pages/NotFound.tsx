
import { Link } from "react-router";

function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">

      <h1 className="text-7xl font-bold text-indigo-600">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-gray-900">
        Page Not Found
      </h2>

      <p className="mt-3 text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
      >
        Back to Home
      </Link>

    </div>
  );
}

export default NotFound;
