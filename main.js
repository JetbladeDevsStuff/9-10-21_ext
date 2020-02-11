// main.js of 9 + 10 = 21
// This whole thing will wait a half a second for jQuery to load
setTimeout(() => {
    var title = $("title").html();
    // We will write a function that will check if the extention "on/off" 
    // state has been changed (passing null into the get function 
    // returns everything in storage)
    function getExtentionStorage() {
        chrome.storage.local.get(null, (data) => {
            console.log(data);
            return(data.key);
        })
    }

    console.log(getExtentionStorage())
}, 500);
