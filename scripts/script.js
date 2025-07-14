// scripts/script.js

function showTool(toolId) {
  const sections = document.querySelectorAll(".tool-section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  const selected = document.getElementById(toolId);
  if (selected) {
    selected.classList.add("active");
  }

  // Highlight selected tab in sidebar
  const listItems = document.querySelectorAll(".sidebar li");
  listItems.forEach((li) => {
    li.classList.remove("active");
  });

  const activeLi = Array.from(listItems).find(li =>
    li.textContent.toLowerCase().includes(toolId)
  );
  if (activeLi) {
    activeLi.classList.add("active");
  }
}
