let script=document.createElement('script');
script.textContent=`
(function () {
    window.originalFetch = window.fetch;
    window.preloaded='added from preload.js';
    window.fetch = async function (url, options = {}) {
        console.log("Fetching:", url, options);
        try {
            const response = await window.originalFetch(url, options);
            console.log
            return response;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };
})();`;
document.documentElement.appendChild(script);
let script2=document.createElement('script');
let url=chrome.runtime.getURL('injected.js');
console.log(`url = ${url}`);
script2.src=url;
document.documentElement.appendChild(script2);
console.log('preload script was executed');
// console.dir(document);
