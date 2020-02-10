// main.js of 9 + 10 = 21
// This whole thing will wait a bit for jQuery to load
setTimeout(() => {
    var title = $("title").html();
    // We will write a function that will check if the wanted tab title or 
    // extention "on/off" state has been changed every 5 seconds

    function getExtentionStorage() {
        chrome.storage.local.get([null], (storage) => {
            console.log(storage)
        })
    }

    function setTabTitle() {
        setTimeout(() => {
            
        }, 5000);
    }

    setTimeout(() => {
        getExtentionStorage();
    }, 3000);
}, 1000);
