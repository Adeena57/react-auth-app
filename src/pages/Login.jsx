import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");

  const [isMobile, setIsMobile] = useState(false); // ✅ detect mobile

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogin = () => {
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
    }

    if (!valid) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      if (isMobile) setPasswordError("Invalid email or password");
      else toast.error("Invalid email or password");
      return;
    }

    login(foundUser);
    if (!isMobile) toast.success("Login successful 🎉");
    setSuccess("Login successful! Redirecting...");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

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

      <button onClick={handleLogin}>Login</button>

      {isMobile && success && (
        <div
          style={{ color: "green", marginTop: "12px", textAlign: "center" }}
        >
          {success}
        </div>
      )}

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
