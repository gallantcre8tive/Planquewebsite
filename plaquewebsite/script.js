/** @format */

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  const pageTitle = document.getElementById("pageTitle");

  // Sidebar collapsed state (save to localStorage)
  const STORAGE_KEY = "pq_sidebar_collapsed_v1";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "1") {
    app.classList.add("collapsed");
  }

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const collapsed = app.classList.toggle("collapsed");
    localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
  });

  // Nav item active toggle
  navItems.forEach((item) => {
    item.addEventListener("click", (ev) => {
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      const key = item.getAttribute("data-key") || item.textContent.trim();
      if (pageTitle)
        pageTitle.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    });
  });

  // Close sidebar on outside click (for small screens)
  document.addEventListener("click", (ev) => {
    if (window.innerWidth < 900) {
      const clickedInsideSidebar = sidebar.contains(ev.target);
      const clickedToggle = toggleBtn.contains(ev.target);
      if (!clickedInsideSidebar && !clickedToggle) {
        app.classList.add("collapsed");
      }
    }
  });

  // Keyboard shortcut "m" to toggle sidebar
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "m") {
      const collapsed = app.classList.toggle("collapsed");
      localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    }
  });

  // ===================== BOT TOGGLE =====================
  const botToggleBtn = document.getElementById("botToggleBtn");
  let botRunning = true; // initially running

  botToggleBtn.classList.add("active"); // red state initially

  // ===================== DISCORD TOGGLE =====================
  const discordToggleBtn = document.getElementById("discordToggleBtn");
  let discordConnected = true; // starts connected

  // Status Dot + Text
  const statusDot = document.querySelector(".status-dot");
  const statusText = document.querySelector(".status-text");

  // Update status dot and text
  function updateStatusDisplay(connected) {
    if (connected) {
      statusDot.classList.add("active");
      statusDot.classList.remove("inactive");
      statusText.textContent = "Active";
    } else {
      statusDot.classList.add("inactive");
      statusDot.classList.remove("active");
      statusText.textContent = "Inactive";
    }
  }

  // Function to change Discord connection state
  function setDiscordConnected(isConnected) {
    discordConnected = isConnected;
    updateStatusDisplay(isConnected);
    discordToggleBtn.textContent = isConnected ? "Connected" : "Disconnected";
    discordToggleBtn.classList.toggle("connected", isConnected);
    discordToggleBtn.classList.toggle("disconnected", !isConnected);
  }

  // Initialize on load
  updateStatusDisplay(discordConnected);

  // Discord manual toggle
  discordToggleBtn.addEventListener("click", () => {
    setDiscordConnected(!discordConnected);
  });

  // Bot toggle button logic
  botToggleBtn.addEventListener("click", () => {
    botRunning = !botRunning;

    if (botRunning) {
      botToggleBtn.textContent = "Stop Bot";
      botToggleBtn.classList.add("active");
      botToggleBtn.classList.remove("stopped");

      // After 1 second, connect Discord
      setTimeout(() => {
        setDiscordConnected(true);
      }, 1000);
    } else {
      botToggleBtn.textContent = "Start Bot";
      botToggleBtn.classList.add("stopped");
      botToggleBtn.classList.remove("active");

      // After 2 seconds, disconnect Discord
      setTimeout(() => {
        setDiscordConnected(false);
      }, 2000);
    }
  });
});
