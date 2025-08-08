let reelChanges = [];
let lastReelId = null;

const getReelId = () => {
  const match = location.pathname.match(/\/reels\/([^/]+)/);
  return match ? match[1] : null;
};

const checkDoomscrolling = () => {
  const currentReelId = getReelId();
  if (!currentReelId || currentReelId === lastReelId) return;

  lastReelId = currentReelId;
  const now = Date.now();
  reelChanges.push(now);

  reelChanges = reelChanges.filter(t => now - t <= 10000);

  if (reelChanges.length > 2) {
    chrome.runtime.sendMessage({ doomscroll: true });
  }
};

setInterval(checkDoomscrolling, 1000);