let changedReel = [];
let lastReelId = null;

const getReelId = () => {
  const match = location.pathname.match(/\/reels\/([^/]+)/);
  return match ? match[1] : null;
};

const check = () => {
  const currentReelId = getReelId();
  if (!currentReelId || currentReelId === lastReelId) return;

  lastReelId = currentReelId;
  const now = Date.now();
  changedReel.push(now);

  changedReel = changedReel.filter(t => now - t <= 10000);

  if (changedReel.length > 2) {
    chrome.runtime.sendMessage({ doomscroll: true });
  }
};

setInterval(check, 1000);