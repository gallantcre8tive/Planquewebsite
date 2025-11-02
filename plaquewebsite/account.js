/**
 * account.js
 *
 * @format
 */

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const toggleBtn = document.getElementById("toggleBtn");
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  const STORAGE_KEY = "pq_sidebar_collapsed_v1";

  // Restore collapsed state
  if (localStorage.getItem(STORAGE_KEY) === "1") {
    app.classList.add("collapsed");
  }

  // Toggle handler (persist)
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const collapsed = app.classList.toggle("collapsed");
    localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
  });

  // Active nav item handling + optional page title update
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      // (optional) update visible page title
      const key =
        item.dataset.key ||
        item.querySelector(".nav-text")?.textContent?.trim();
      const pageTitle = document.getElementById("pageTitle");
      if (pageTitle && key) {
        pageTitle.textContent = key.charAt(0).toUpperCase() + key.slice(1);
      }
    });
  });

  // Close sidebar when clicking outside on narrow screens
  document.addEventListener("click", (ev) => {
    if (window.innerWidth < 900) {
      const sidebar = document.getElementById("sidebar");
      const clickedInside = sidebar.contains(ev.target);
      const clickedToggle = toggleBtn.contains(ev.target);
      if (!clickedInside && !clickedToggle) {
        app.classList.add("collapsed");
      }
    }
  });

  // keyboard toggle (m)
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "m") {
      const collapsed = app.classList.toggle("collapsed");
      localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    }
  });
});
