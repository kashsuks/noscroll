document.getElementById("unlockBtn").onclick = () => {
  const url = document.getElementById("commitInput").value.trim();
  const isValid = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/commit\/[a-f0-9]{40}$/.test(url);

  if (isValid) {
    chrome.runtime.sendMessage({ unlock: true }, () => {
      window.location.href = "https://instagram.com";
    });
  } else {
    document.getElementById("status").textContent = "Invalid GitHub commit URL";
    document.getElementById("status").style.color = "red";
  }
};