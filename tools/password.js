// tools/password.js

const passwordInput = document.getElementById("passwordInput");
const strengthText = document
  .getElementById("strengthText")
  .querySelector("span");

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const score = calculateStrength(password);

  if (!password) {
    strengthText.textContent = "—";
    strengthText.style.color = "#8b949e";
  } else if (score >= 4) {
    strengthText.textContent = "Strong";
    strengthText.style.color = "#2ecc71";
  } else if (score >= 2) {
    strengthText.textContent = "Moderate";
    strengthText.style.color = "#f1c40f";
  } else {
    strengthText.textContent = "Weak";
    strengthText.style.color = "#e74c3c";
  }
});

function calculateStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}
