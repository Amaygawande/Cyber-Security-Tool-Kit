// tools/hash.js

// MD5 using CryptoJS
function md5(str) {
  return CryptoJS.MD5(str).toString();
}

async function generateHash() {
  const text = document.getElementById("hashInput").value;
  const algo = document.getElementById("hashAlgorithm").value;
  const output = document.getElementById("hashOutput");

  if (!text) {
    output.value = "Please enter some text.";
    return;
  }

  try {
    if (algo === "md5") {
      output.value = md5(text);
    } else {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const buffer = await crypto.subtle.digest(algo.toUpperCase(), data);
      const hashArray = Array.from(new Uint8Array(buffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      output.value = hashHex;
    }
  } catch (err) {
    output.value = "❌ Error generating hash.";
    console.error(err);
  }
}
