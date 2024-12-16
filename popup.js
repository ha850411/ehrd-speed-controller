document.addEventListener('DOMContentLoaded', function() {
    const speedControl = document.getElementById('speedControl');
    const speedValue = document.getElementById('speedValue');
  
    chrome.storage.sync.get(['speed'], function(data) {
      if (data.speed) {
        speedControl.value = data.speed;
        speedValue.textContent = data.speed;
      }
    });
  
    speedControl.addEventListener('input', function() {
      const speed = speedControl.value;
      speedValue.textContent = speed;
      
      // 儲存新的速度值到 chrome.storage.sync
      chrome.storage.sync.set({ speed: parseFloat(speed) });
    });
});