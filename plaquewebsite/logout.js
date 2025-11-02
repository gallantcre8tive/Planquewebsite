/** @format */

document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesLogout");
  const noBtn = document.getElementById("noLogout");

  // YES → clear data + go to landing page
  yesBtn.addEventListener("click", () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "../plaquewebsite/plaque.html"; // adjust path if needed
  });

  // NO → return to login page
  noBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
