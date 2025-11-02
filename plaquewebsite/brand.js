/** @format */

// Sidebar toggle (collapse)
const app = document.getElementById("app");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  app.classList.toggle("collapsed");
});

// Modal controls
const openAddBrandBtn = document.getElementById("openAddBrandBtn");
const addBrandModal = document.getElementById("addBrandModal");
const cancelAddBrand = document.getElementById("cancelAddBrand");
const addBrandForm = document.getElementById("addBrandForm");
const brandsTableBody = document.querySelector("#brandsTable tbody");

openAddBrandBtn.addEventListener("click", () => {
  addBrandModal.classList.add("open");
  addBrandModal.setAttribute("aria-hidden", "false");
  document.getElementById("brandName").focus();
});

cancelAddBrand.addEventListener("click", () => {
  addBrandModal.classList.remove("open");
  addBrandModal.setAttribute("aria-hidden", "true");
});

addBrandModal.addEventListener("click", (e) => {
  // close when clicking outside modal
  if (e.target === addBrandModal) {
    addBrandModal.classList.remove("open");
    addBrandModal.setAttribute("aria-hidden", "true");
  }
});

// Add brand form submit -> append a row
addBrandForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("brandName").value.trim();
  const category = document.getElementById("brandCategory").value;
  const autoBuy = document.getElementById("brandAutoBuy").checked;
  const alerts = document.getElementById("brandAlerts").checked;

  if (!name) return;

  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${escapeHtml(name)}</td>
    <td>${escapeHtml(category)}</td>
    <td><label class="switch"><input type="checkbox" ${
      autoBuy ? "checked" : ""
    }><span class="slider"></span></label></td>
    <td><label class="switch"><input type="checkbox" ${
      alerts ? "checked" : ""
    }><span class="slider"></span></label></td>
    <td><i class="fa-regular fa-clock"></i> now</td>
    <td><button class="icon-btn delete-btn" title="Delete"><i class="fa-regular fa-trash-can"></i></button></td>
  `;

  brandsTableBody.appendChild(tr);

  // reset and close
  addBrandForm.reset();
  addBrandModal.classList.remove("open");
  addBrandModal.setAttribute("aria-hidden", "true");
});

// Delete row (event delegation)
brandsTableBody.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-btn");
  if (btn) {
    const row = btn.closest("tr");
    if (row) row.remove();
  }
});

// small helper to avoid HTML injection
function escapeHtml(text) {
  return text.replace(/[&<>"'`=\/]/g, function (s) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "=": "&#x3D;",
      "`": "&#x60;",
    }[s];
  });
}
