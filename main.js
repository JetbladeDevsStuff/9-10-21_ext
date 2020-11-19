// main.js of 9 + 10 = 21
var debug = true;
if(debug) {
  console.log("[9 + 10 = 21 DEBUG] debug enabled - expect console to be spammed a bit");
}
  // We will write a function that will check if the extention "on/off"
  // state has been changed (passing null into the get function
  // returns everything in storage)
  async function getExtentionStorage(_callback) {
      await chrome.storage.local.get(null, (data) => {
          if (debug) {
            console.log("[9 + 10 = 21 DEBUG] storage object:");
            console.log(data);
          }
          _callback(data);
      });
  }

async function setTitle(_callback) {
  // https://stackoverflow.com/questions/13455134/javascript-doesnt-seem-to-wait-for-return-values
  // i spent so much time searching for the solution to this
  // callbacks are the best
  await getExtentionStorage((data) => {
    // This will actually do something
    // TODO: Make data.on = true or false to make the code look cleaner
    if (data.on == "on") {
      document.querySelector("title").innerText = data.tabText;
    } else {
      if(debug){
        console.log("[9 + 10 = 21 DEBUG] thingy is disabled");
    }}
    _callback();
});
}

document.addEventListener('DOMContentLoaded', setTitle(() => {}));

// mutation observers are wierd
var title = document.querySelector("title");
// observer config
var oConfig = { childList: true, subtree: true };

var observer = new MutationObserver((mutationsList) => {
  console.log(mutationsList);
  observer.disconnect();
  if(debug) {
    console.log("[9 + 10 = 21 DEBUG] about to change title - stopped observing");
  }
  setTitle(() => {
    
    setTimeout(() => {
      observer.observe(title, oConfig);
      if(debug) {
        console.log("[9 + 10 = 21 DEBUG] 200ms passed - observing again");
      }
    }, 200);
  });
});

observer.observe(title, oConfig);