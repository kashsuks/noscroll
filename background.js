let blocked = false;

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.doomscroll) {
    blocked = true;
    chrome.tabs.remove(sender.tab.id);
    chrome.tabs.create({ url: "https://github.com" });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (blocked && tab.url.includes("instagram.com")) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["blocker.js"]
    });
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.unlock) blocked = false;
});