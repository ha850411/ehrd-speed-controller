function setVideoSpeed(speed) {
    const video = document.getElementById('content')
      ?.contentWindow.document.getElementById('playContent')
      ?.contentWindow.document.getElementById('Content')
      ?.contentWindow.document.getElementsByTagName('video')[0];
    if (video) {
        video.playbackRate = speed;
        console.log("Video element found and speed set to " + speed + "x");
    } else {
        console.log("Video element not found, retrying in 1 second...");
        setTimeout(() => setVideoSpeed(speed), 1000); // 每一秒重試一次
    }
}

// 當 content script 加載時，從 chrome.storage.sync 中讀取速度值並設置影片速度
chrome.storage.sync.get(['speed'], function(data) {
    if (data.speed) {
        setVideoSpeed(data.speed);
    }
});

// 監聽來自 background.js 的訊息，並即時調整影片速度
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "setSpeed") {
        setVideoSpeed(request.speed);
    }
});