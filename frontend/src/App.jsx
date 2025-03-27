import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_BACKEND_URL; // Use env variable

    axios.get(API_URL)
      .then(res => setMessage(res.data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return <h1>{message || "Loading..."}</h1>;
}

export default App;
