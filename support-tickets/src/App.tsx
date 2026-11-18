
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TicketDetail from "./pages/TicketDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-gray-50">

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/ticket/:id"
            element={<TicketDetail />}
          />

          <Route path="*" element={<NotFound />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;
