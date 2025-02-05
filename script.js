const urlInput = document.getElementById("urlInput");
const browserFrame = document.getElementById("browserFrame");
const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");
const homeBtn = document.getElementById("homeBtn");
const goBtn = document.getElementById("goBtn");

let historyStack = [];
let currentIndex = -1;

// Proxy options (choose best working one)
const proxies = [
    "https://www.croxyproxy.com/",
    "https://www.hidemyass.com/proxy",
    "https://proxyscrape.com/web-proxy",
    "https://www.proxysite.com/"
];

const homepage = proxies[0]; // Default to first working proxy

function loadURL(url) {
    if (!url.startsWith("http")) {
        url = "https://" + url;
    }

    let proxiedURL = homepage + "?" + encodeURIComponent(url);
    browserFrame.src = proxiedURL;

    historyStack = historyStack.slice(0, currentIndex + 1);
    historyStack.push(url);
    currentIndex++;
}

// Event Listeners
urlInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        loadURL(urlInput.value.trim());
    }
});

goBtn.addEventListener("click", function () {
    loadURL(urlInput.value.trim());
});

backBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
        currentIndex--;
        browserFrame.src = homepage + "?" + encodeURIComponent(historyStack[currentIndex]);
    }
});

forwardBtn.addEventListener("click", function () {
    if (currentIndex < historyStack.length - 1) {
        currentIndex++;
        browserFrame.src = homepage + "?" + encodeURIComponent(historyStack[currentIndex]);
    }
});

homeBtn.addEventListener("click", function () {
    loadURL(homepage);
});

// Load homepage on start
loadURL(homepage);
