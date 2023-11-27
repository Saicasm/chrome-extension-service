document.addEventListener("DOMContentLoaded", function () {
  console.log("start");

  const scrapeButton = document.getElementById("scrapeButton");

  scrapeButton.addEventListener("click", function () {
    console.log("test");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else if (tabs && tabs[0]) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: "scrapeDOM" });
        // chrome.scripting.executeScript({
        //   target: { tabId: activeTab.id },
        //   function: triggerScraping,
        // });
      } else {
        console.error("No active tab found.");
      }
    });
  });
});

function triggerScraping() {
  // Send a message to the content script to initiate scraping
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs && tabs[0]) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: "scrapeDOM" });
    } else {
      console.error("No active tab found when triggering scraping.");
    }
  });
}

// Add listener for messages from content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "sendDOM") {
    console.log("rewr");
    const scrapedDOM = message.domContent;
    if (scrapedDOM) {
      sendDataToBackend(scrapedDOM);
    } else {
      console.error("Failed to scrape DOM content.");
    }
  }
});

function sendDataToBackend(data) {
  // Replace with your backend server URL
  const backendUrl = "https://your-backend-server.com/endpoint";

  // Make a POST request to send data to the backend
  console.log("backend data", data);
  //   axios
  //     .post(backendUrl, { data })
  //     .then((response) => {
  //       console.log("DOM content sent to the backend:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error sending DOM content to the backend:", error);
  //     });
}
