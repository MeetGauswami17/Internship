
function Home() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          TicketDesk - AI Support
        </h1>

        <p className="mt-5 text-lg text-gray-600">
          Describe your problem. AI sorts it before a human even looks.
        </p>

        <button className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
          Submit a Ticket
        </button>

      </div>
    </div>
  );
}

export default Home;
