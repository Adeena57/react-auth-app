import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // Update class on body when theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Dashboard
          </h2>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg"
            >
              {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
            </button>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8 text-center transition-colors duration-300">
          <div className="text-4xl mb-2">
            {user.role === "admin" ? "👑" : "👤"}
          </div>
          <h3 className="text-xl font-semibold dark:text-white">Welcome back</h3>
          <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Projects", "Completed", "In Progress"].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center transition-colors duration-300"
            >
              <h4 className="text-gray-600 dark:text-gray-300">{item}</h4>
              <p className="text-3xl font-bold text-indigo-600 mt-2">
                {i === 0 ? 12 : i === 1 ? 8 : 4}
              </p>
            </div>
          ))}
        </div>

        {/* Admin Section */}
        {user.role === "admin" && (
          <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition-colors duration-300">
            <h3 className="text-lg font-semibold dark:text-white mb-4">
              Admin Controls
            </h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                Manage Users
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                Reports
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
