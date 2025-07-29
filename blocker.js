document.getElementById('submit').onclick = () => {
  const url = document.getElementById('commitUrl').value;
  const pattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/commit\/[a-f0-9]{40}$/;

  if (pattern.test(url)) {
    chrome.runtime.sendMessage({ unlock: true });
    window.close();
  } else {
    alert("Invalid commit URL!");
  }
};