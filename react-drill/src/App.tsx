
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TicketProvider } from "./context/TicketContext";

import Navbar from "./components/Navbar";

import Board from "./pages/Board";
import NewTicket from "./pages/NewTicket";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <TicketProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/new" element={<NewTicket />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TicketProvider>
  );
}

export default App;
