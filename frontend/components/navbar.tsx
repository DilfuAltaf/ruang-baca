const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};

<button onClick={handleLogout}>
  Logout
</button>