// content.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "scrapeDOM") {
    console.log("Hi");
    const wholeDOM = document.documentElement.outerHTML;
    chrome.runtime.sendMessage({ action: "sendDOM", domContent: wholeDOM });
  }
});
