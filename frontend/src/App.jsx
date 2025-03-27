import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {




  return (
    <AuthProvider>

    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/" element={<JobsPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
