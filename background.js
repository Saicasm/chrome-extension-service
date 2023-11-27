// background.js

// Add any background script logic if needed.

// Example: Listen for an event from a content script.
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "backgroundAction") {
    // Perform background script logic here.
    // You can send a response back to the content script if needed.
    const responseMessage = {
      result: "Background script processed the message.",
    };
    sendResponse(responseMessage);
  }
});
