browser.runtime.onInstalled.addListener(() => {
    console.log("Background service worker installed!");
  });
  
  // Listen for incoming requests and modify the headers
browser.webRequest.onBeforeRequest.addListener(
    (details) => {
      console.log('Request URL:', details.url);
      // You can modify the request here
      return { cancel: false }; // Returning false lets the request proceed
    },
    { urls: ["<all_urls>"] }, // This is the filter for URLs to capture
    ["blocking"] // To block or modify the request
  );
  