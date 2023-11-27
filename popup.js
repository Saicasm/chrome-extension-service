document.addEventListener("DOMContentLoaded", function () {
  const captureButton = document.getElementById("scrapeButton");
  captureButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: captureData,
      });
    });
  });
});

function captureData() {
  // Replace this with your logic to find the element by its text content
  const searchText = "Software"; // Replace with the text you want to find
  console.log("test");
  const wholeDOM = document.documentElement.outerHTML;
  const targetElement = document.querySelector(
    ".scaffold-layout__detail.overflow-x-hidden.jobs-search__job-details"
  );
  const htmlContent = targetElement.innerHTML;

  console.log("Roles", targetElement);

  const apiUrl = "http://localhost:8080/api/v1/ingest/saicsm@gmail.com"; // Replace with your API URL
  //application-outlet
  // Make a GET request to the Go API
  fetch(apiUrl, {
    method: "POST",
    body: htmlContent,
    // headers: {
    //   "Content-type": "application/json; charset=UTF-8",
    // },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data from Go API:", data);
      // You can process the data as needed
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  // const elementsWithText = [...document.querySelectorAll("*")].filter(
  //   (element) => {
  //     return element.textContent.includes(searchText);
  //   }
  // );

  // if (elementsWithText.length > 0) {
  //   const data = elementsWithText[0].textContent;
  //   // console.log("dta", data);
  //   sendDataToBackend(data);
  // } else {
  //   console.log(`No element containing "${searchText}" found.`);
  // }
}

function sendDataToBackend(data) {
  // Replace with your code to send data to the backend
  // ...
}
