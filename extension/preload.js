console.log(new Date().toLocaleTimeString());

function preload(){
    console.log('executing preload function');
    window.originalFetch = window.fetch;    
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
    console.log('fetch redefined');
}

var script=document.createElement('script');
script.textContent=preload.toString()+';preload()';
document.documentElement.append(script);
