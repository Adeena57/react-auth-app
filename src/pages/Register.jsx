import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");

  const [isMobile, setIsMobile] = useState(false); // ✅ detect mobile

  const navigate = useNavigate();

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleRegister = () => {
    // Reset previous errors
    setEmailError("");
    setPasswordError("");
    setSuccess("");

    let valid = true;

    if (!email) {
      if (isMobile) setEmailError("Email is required");
      else toast.error("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      if (isMobile) setEmailError("Please enter a valid email");
      else toast.error("Please enter a valid email");
      valid = false;
    }

    if (!password) {
      if (isMobile) setPasswordError("Password is required");
      else toast.error("Password is required");
      valid = false;
    } else if (password.length < 6) {
      if (isMobile) setPasswordError("Password must be at least 6 characters");
      else toast.error("Password must be at least 6 characters");
      valid = false;
    }

    if (!valid) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.email === email)) {
      if (isMobile) setEmailError("User already exists");
      else toast.error("User already exists");
      return;
    }

    const newUser = { email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Registered successfully! Redirecting to login...");
    if (!isMobile) toast.success("Registered successfully! 🎉");

    setEmail("");
    setPassword("");
    setRole("user");

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {isMobile && emailError && (
        <div className="field-error">{emailError}</div>
      )}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {isMobile && passwordError && (
        <div className="field-error">{passwordError}</div>
      )}

      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleRegister}>Register</button>

      {isMobile && success && (
        <div style={{ color: "green", marginTop: "12px", textAlign: "center" }}>
          {success}
        </div>
      )}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
