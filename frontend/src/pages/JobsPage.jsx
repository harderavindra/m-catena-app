import { useEffect, useState } from "react";
import axios from "axios";

const JobsPage = () => {
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [jobs, setJobs] = useState([]);
    const API_URL = import.meta.env.VITE_BACKEND_URL; // Use environment variable

  // Fetch message from backend
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setMessage(res.data.message))
      .catch(err => console.error("Error:", err));
      axios.get(`${API_URL}/api/jobs/`)
      .then(res => setJobs(res.data))
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
    <ul>
      {jobs.map(job => (
        <li key={job._id}>
          <h3>{job.title}</h3>
          <p><strong>Type:</strong> {job.type}</p>
          <p><strong>Priority:</strong> {job.priority}</p>
          <p><strong>Offer Details:</strong> {job.offerDetails}</p>
          <p><strong>Zone:</strong> {job.zone}, {job.state}</p>
          <p><strong>Language:</strong> {job.language}</p>
          <p><strong>Product:</strong> {job.product}</p>
          <p><strong>Brand:</strong> {job.brand}</p>
          <p><strong>Model:</strong> {job.model}</p>
          <p><strong>Final Status:</strong> {job.finalStatus}</p>
          {job.attachment && (
            <p>
              <strong>Attachment:</strong> 
              <a href={job.attachment} target="_blank" rel="noopener noreferrer">
                View File
              </a>
            </p>
          )}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default JobsPage