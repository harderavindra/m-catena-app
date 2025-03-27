import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";

function App() {




  return (

    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/" element={<JobsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
