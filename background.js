// 監聽 chrome.storage 中的變更
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.speed) {
        const newSpeed = changes.speed.newValue;
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, { action: "setSpeed", speed: newSpeed });
            });
        });
    }
});

// 當頁面加載時，從 chrome.storage.sync 中讀取速度值並設置影片速度
chrome.webRequest.onCompleted.addListener(
    function(details) {
        chrome.storage.sync.get(["speed"], function(result) {
            let speed = result?.["speed"] || 1;
            chrome.tabs.sendMessage(details.tabId, { action: "setSpeed", speed: speed });
        });
    },
    {
        types: ["main_frame"],
        urls: ["<all_urls>"]
    },
    ['responseHeaders']
);