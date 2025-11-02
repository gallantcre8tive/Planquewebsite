/** @format */

import { useEffect, useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  // ✅ New states for search
  const [country, setCountry] = useState("UK");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    if (token && savedEmail) {
      setUser(savedEmail);
      setMessage("✅ Logged in as " + savedEmail);
    }
  }, []);

  // Register
  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        setUser(data.email);
        setMessage("Registered ✅ Logged in as " + data.email);
      } else {
        setMessage(data.message || "❌ Registration failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Registration failed");
    }
  };

  // Login
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        setUser(data.email);
        setMessage("Logged in ✅ Welcome " + data.email);
      } else {
        setMessage(data.message || "❌ Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Login failed");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(null);
    setResults([]);
    setMessage("Logged out ❌");
  };

  // ✅ Search API call
  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const query = new URLSearchParams({
        country,
        brand,
        size,
        keyword,
      }).toString();

      const res = await fetch(`http://localhost:5000/api/search?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setResults(data);
      setMessage(`🔍 Found ${data.length} results`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Search failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vinted Bot Demo</h1>

      {!user ? (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />

          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <p>Welcome, {user}!</p>
          <button onClick={handleLogout}>Logout</button>

          <hr />
          <h2>🔍 Search Listings</h2>

          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="UK">UK</option>
            <option value="PL">Poland</option>
            <option value="FR">France</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <br />
          <button onClick={handleSearch}>Search</button>

          <ul>
            {results.map((item) => (
              <li key={item._id}>
                <strong>{item.title}</strong> - {item.price} {item.currency} (
                {item.country})
              </li>
            ))}
          </ul>
        </>
      )}

      <p>{message}</p>
    </div>
  );
}

export default App;
