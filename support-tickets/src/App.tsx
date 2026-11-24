
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AuthedRoute from "./components/AuthedRoute";

import SubmitTicket from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TicketDetail from "./pages/TicketDetail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SubmitTicket />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <AuthedRoute>
              <Dashboard />
            </AuthedRoute>
          }
        />

        <Route
          path="/ticket/:id"
          element={
            <AuthedRoute>
              <TicketDetail />
            </AuthedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
