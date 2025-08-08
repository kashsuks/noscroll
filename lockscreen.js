document.getElementById("unlockBtn").onclick = () => {
  const url = document.getElementById("commitInput").value.trim();
  const valid = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/commit\/[a-f0-9]{40}$/.test(url);

  if (valid) {
    chrome.runtime.sendMessage({ unlock: true }, () => {
      window.location.href = "https://instagram.com";
    });
  } else {
    document.getElementById("status").textContent = "Invalid GitHub commit URL";
    document.getElementById("status").style.color = "red";
  }
};

// block times below the unlock button
chrome.storage.local.get("blockCount", (data) => {
  const count = data.blockCount || 0;
  document.getElementById("blockCount").textContent =
    `Instagram blocked ${count} time${count !== 1 ? 's' : ''}.`;
});