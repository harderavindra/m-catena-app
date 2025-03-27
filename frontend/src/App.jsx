import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const API_URL = import.meta.env.VITE_BACKEND_URL; // Use environment variable

  // Fetch message from backend
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setMessage(res.data.message))
      .catch(err => console.error("Error:", err));

    // Fetch users
    axios.get(`${API_URL}/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  // Handle form submission (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await axios.post(`${API_URL}/users`, { name });
      setUsers([...users, res.data.user]); // Update UI with new user
      setName("");
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <div>
      <h1>{message || "Loading..."}</h1>

      <h2>Users:</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;
