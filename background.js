chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.doomscroll) {
    chrome.storage.local.set({ blocked: true });
    chrome.tabs.remove(sender.tab.id);
    chrome.tabs.create({ url: "https://github.com" });
  }

  if (msg.unlock) {
    chrome.storage.local.set({ blocked: false });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete') return;

  chrome.storage.local.get("blocked", data => {
    if (data.blocked && tab.url.includes("instagram.com")) {
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => window.location.replace(chrome.runtime.getURL("lockscreen.html"))
      });
    }
  });
});