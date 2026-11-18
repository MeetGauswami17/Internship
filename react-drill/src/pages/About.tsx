
function About() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">
        About DeskTickets
      </h1>

      <p className="text-gray-600 leading-7">
        DeskTickets is a simple ticket management application
        built using React, TypeScript, and Tailwind CSS.
        It helps users organize support tickets by their
        status and priority.
      </p>

      <p className="text-gray-600 leading-7 mt-4">
        Users can create new tickets, update ticket status,
        delete tickets, and search tickets by subject.
        All ticket information is saved in browser localStorage.
      </p>
    </div>
  );
}

export default About;
