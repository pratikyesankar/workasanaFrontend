 import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/signup", {
        name,
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", paddingTop: "50px" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Signup
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default Signup;
