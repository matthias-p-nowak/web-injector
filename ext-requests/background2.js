chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        let headers = details.responseHeaders;

        headers = headers.map(header => {
            if (header.name.toLowerCase() === 'access-control-allow-origin') {
                header.value = '*'; // Allow all origins
            }
            return header;
        });

        // If the header does not exist, add it
        if (!headers.some(header => header.name.toLowerCase() === 'access-control-allow-origin')) {
            headers.push({ name: 'Access-Control-Allow-Origin', value: '*' });
        }

        return { responseHeaders: headers };
    },
    { urls: ["<all_urls>"] },
    ["blocking", "responseHeaders"]
);

chrome.webRequest.onBeforeRequest.addListener(
    async function (details) {
        if (details.method === "GET" && details.type === "main_frame") {
            let response = await fetch(details.url);
            let text = await response.text();

            // Modify content (example: replace "Hello" with "Hi")
            let modifiedText = text.replace(/Hello/g, "Hi");

            return { redirectUrl: "data:text/html;charset=utf-8," + encodeURIComponent(modifiedText) };
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);
