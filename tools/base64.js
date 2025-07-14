// tools/base64.js

function handleBase64() {
  const mode = document.getElementById("base64Mode").value;
  const input = document.getElementById("base64Input").value.trim();
  const output = document.getElementById("base64Output");

  if (!input) {
    output.value = "Please enter some text.";
    return;
  }

  try {
    if (mode === "encode") {
      output.value = btoa(unescape(encodeURIComponent(input)));
    } else {
      output.value = decodeURIComponent(escape(atob(input)));
    }
  } catch (err) {
    output.value = "❌ Invalid input for decoding.";
  }
}
