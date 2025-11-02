/** @format */

// Sidebar toggle
const app = document.getElementById("app");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  app.classList.toggle("collapsed");
});
