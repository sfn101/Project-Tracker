// API Request utility
async function apiRequest(url, options = {}) {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  };

  // Get token from localStorage
  const token = localStorage.getItem("authToken");
  if (token) {
    defaultOptions.headers["Authorization"] = `Bearer ${token}`;
  }

  // Add cache-busting parameter for GET requests
  if (!options.method || options.method === "GET") {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}_t=${Date.now()}`;
  }

  const finalOptions = { ...defaultOptions, ...options };

  // Merge headers
  if (options.headers) {
    finalOptions.headers = { ...defaultOptions.headers, ...options.headers };
  }

  try {
    const response = await fetch(url, finalOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API Request failed:", error);
    throw error;
  }
}

// Token management utilities
function setAuthToken(token) {
  localStorage.setItem("authToken", token);
}

function getAuthToken() {
  return localStorage.getItem("authToken");
}

function removeAuthToken() {
  localStorage.removeItem("authToken");
}

// Dark mode toggle
function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.contains("dark");

  if (isDark) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

// Initialize dark mode on page load
function initDarkMode() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
}

// Logout function
function logout() {
  removeAuthToken();
  window.location.href = "/login";
}

// Toast notification utility
function showToast(message, type = "success") {
  // Remove existing toast if any
  const existingToast = document.getElementById("toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : type === "warning"
          ? "bg-yellow-500"
          : "bg-blue-500"
  }`;
  toast.textContent = message;

  document.body.appendChild(toast);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Navigate to protected route with token
function navigateWithAuth(url) {
  const token = getAuthToken();
  if (token) {
    // Add token as query parameter
    const separator = url.includes("?") ? "&" : "?";
    const urlWithToken = `${url}${separator}auth_token=${encodeURIComponent(token)}`;
    window.location.href = urlWithToken;
  } else {
    window.location.href = "/login";
  }
}

// Check authentication on protected pages
function checkAuth() {
  const token = getAuthToken();
  const currentPath = window.location.pathname;

  // List of protected routes
  const protectedRoutes = ["/dashboard", "/projects", "/tasks", "/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    window.location.href = "/login";
    return false;
  }

  return true;
}

// Refresh current page data
function refreshPageData() {
  const currentPath = window.location.pathname;

  // Call the appropriate load function based on current page
  if (currentPath === "/dashboard") {
    if (typeof loadDashboard === "function") loadDashboard();
    if (typeof loadAdminDashboard === "function") loadAdminDashboard();
  } else if (currentPath === "/projects") {
    if (typeof loadProjects === "function") loadProjects();
  } else if (currentPath === "/users" || currentPath === "/admin/users") {
    if (typeof loadUsers === "function") loadUsers();
  } else if (currentPath === "/tasks") {
    if (typeof loadTasks === "function") loadTasks();
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  checkAuth();
});
