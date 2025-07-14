// tools/url-checker.js

const API_KEY = "AIzaSyBRKWxwkyLyYlIPAv4eWKNhenyG2GQPwQ4"; // 🔒 Replace for production

function isValidURL(url) {
  try {
    new URL(url.startsWith("http") ? url : "http://" + url);
    return true;
  } catch (_) {
    return false;
  }
}

async function domainExists(url) {
  try {
    const response = await fetch(url, { method: "HEAD", mode: "no-cors" });
    return true; // If fetch doesn't throw, domain likely exists
  } catch (err) {
    return false;
  }
}

async function checkURL() {
  const inputEl = document.getElementById("urlInput");
  const resultEl = document.getElementById("urlResult").querySelector("span");
  const input = inputEl.value.trim();
  const formattedURL = input.startsWith("http") ? input : "http://" + input;

  if (!input) {
    resultEl.textContent = "Please enter a URL.";
    resultEl.style.color = "#c9d1d9";
    return;
  }

  if (!isValidURL(formattedURL)) {
    resultEl.textContent = "❌ Invalid URL format.";
    resultEl.style.color = "#f85149";
    resetAfterDelay(inputEl, resultEl);
    return;
  }

  const exists = await domainExists(formattedURL);
  if (!exists) {
    resultEl.textContent = "❌ Domain does not exist.";
    resultEl.style.color = "#f85149";
    resetAfterDelay(inputEl, resultEl);
    return;
  }

  const body = {
    client: { clientId: "cyber-toolkit", clientVersion: "1.0" },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url: formattedURL }],
    },
  };

  try {
    const response = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (data && data.matches && data.matches.length > 0) {
      resultEl.textContent = "⚠️ Unsafe! Threat detected.";
      resultEl.style.color = "#f85149";
    } else {
      resultEl.textContent = "✅ Safe! No threats found.";
      resultEl.style.color = "#238636";
    }
  } catch (err) {
    console.error(err);
    resultEl.textContent = "❌ Error checking URL.";
    resultEl.style.color = "#f85149";
  }

  resetAfterDelay(inputEl, resultEl);
}

function resetAfterDelay(inputEl, resultEl) {
  setTimeout(() => {
    inputEl.value = "";
    resultEl.textContent = "—";
    resultEl.style.color = "#c9d1d9";
  }, 5000);
}
