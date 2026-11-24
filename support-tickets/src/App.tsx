
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Import your existing pages
import SubmitTicket from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SubmitTicket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;
