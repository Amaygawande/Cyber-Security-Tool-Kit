// tools/steganography.js

function encodeStego() {
  const fileInput = document.getElementById("stegoImageInput");
  const message = document.getElementById("stegoMessage").value;
  const canvas = document.getElementById("stegoCanvas");
  const ctx = canvas.getContext("2d");

  if (!fileInput.files.length || !message) {
    alert("Please select an image and enter a message.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const binaryMessage = toBinary(message) + "00000000"; // Null terminator
      let data = imgData.data;

      if (binaryMessage.length > data.length) {
        alert("Message too long for this image.");
        return;
      }

      for (let i = 0; i < binaryMessage.length; i++) {
        data[i] = (data[i] & ~1) | parseInt(binaryMessage[i]);
      }

      ctx.putImageData(imgData, 0, 0);
      alert("✅ Message hidden in image! Right-click to save the image.");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
}

function decodeStego() {
  const canvas = document.getElementById("stegoCanvas");
  const ctx = canvas.getContext("2d");
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  let binary = "";
  for (let i = 0; i < data.length; i++) {
    binary += (data[i] & 1).toString();
  }

  const chars = binary
    .match(/.{8}/g)
    .map((b) => String.fromCharCode(parseInt(b, 2)));
  const message = chars.join("").split("\0")[0]; // Stop at null char

  document.getElementById("stegoOutput").value =
    message || "❌ No message found.";
}

function toBinary(str) {
  return str
    .split("")
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");
}
