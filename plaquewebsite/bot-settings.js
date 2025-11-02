/** @format */

// Follow the same sidebar toggle logic as brand.js
const app = document.getElementById("app");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  app.classList.toggle("collapsed");
});

// Modal controls (reuse ids used in brand page)
const addBrandBtn = document.getElementById("addBrandBtn");
const addBrandModal = document.getElementById("addBrandModal");
const cancelAddBrand = document.getElementById("cancelAddBrand");
const addBrandForm = document.getElementById("addBrandForm");

// open modal
if (addBrandBtn && addBrandModal) {
  addBrandBtn.addEventListener("click", () => {
    addBrandModal.classList.add("open");
    addBrandModal.setAttribute("aria-hidden", "false");
    const nameInput = document.getElementById("brandName");
    if (nameInput) nameInput.focus();
  });
}

// cancel modal
if (cancelAddBrand) {
  cancelAddBrand.addEventListener("click", () => {
    addBrandModal.classList.remove("open");
    addBrandModal.setAttribute("aria-hidden", "true");
  });
}

// close modal when clicking outside
if (addBrandModal) {
  addBrandModal.addEventListener("click", (e) => {
    if (e.target === addBrandModal) {
      addBrandModal.classList.remove("open");
      addBrandModal.setAttribute("aria-hidden", "true");
    }
  });
}

// If form exists, basic submit handler to close modal (you can extend)
if (addBrandForm) {
  addBrandForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // For now, simply close modal after submit; later you can append row etc.
    addBrandModal.classList.remove("open");
    addBrandModal.setAttribute("aria-hidden", "true");
  });
}

/* ---------------------------
   CUSTOM SELECT (dropdown)
   - markup: .custom-select (button + .select-list li[data-value])
   - behavior: click button -> toggle list
               click item -> select (set data-value, update label, close)
   - keyboard & outside click support included
   --------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const selects = Array.from(document.querySelectorAll(".custom-select"));

  selects.forEach((sel) => {
    const btn = sel.querySelector(".select-btn");
    const list = sel.querySelector(".select-list");
    const label = sel.querySelector(".select-label");
    const defaultValue = sel.getAttribute("data-value");
    // mark default selected item
    if (defaultValue && list) {
      const match = list.querySelector(`li[data-value="${defaultValue}"]`);
      if (match) {
        list
          .querySelectorAll("li")
          .forEach((li) => li.classList.remove("selected"));
        match.classList.add("selected");
        if (label) label.textContent = match.dataset.value;
      } else if (label) {
        label.textContent = defaultValue;
      }
    }

    // open/close
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      // close others
      document.querySelectorAll(".select-list.open").forEach((ol) => {
        if (ol !== list) ol.classList.remove("open");
      });
      list.classList.toggle("open");
    });

    // clicking an option
    list.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (!li) return;
      const value = li.dataset.value;
      // set data-value on container
      sel.setAttribute("data-value", value);
      // update label
      if (label) label.textContent = value;
      // highlight selection
      list
        .querySelectorAll("li")
        .forEach((item) => item.classList.remove("selected"));
      li.classList.add("selected");
      // close
      list.classList.remove("open");
    });
  });

  // close all selects on outside click
  document.addEventListener("click", () => {
    document
      .querySelectorAll(".select-list.open")
      .forEach((ol) => ol.classList.remove("open"));
  });

  // keyboard support: close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(".select-list.open")
        .forEach((ol) => ol.classList.remove("open"));
    }
  });
});
