// main.js of 9 + 10 = 21
var debug = false;

getExtentionStorage((data) => {
  if(data.debug == "on") {
    debug = true;
  } else {
    debug = false;
  }
});
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
    if (data.on == "on" || data.on === undefined) {
      if(data.tabText == "") {
        data.tabText = "9 + 10 = 21";
      }
      document.querySelector("title").innerText = data.tabText;
    } else {
      if(debug){
        console.log("[9 + 10 = 21 DEBUG] thingy is disabled");
    }}
    _callback(data.tabText);
});
}

document.addEventListener('DOMContentLoaded', setTitle(() => {}));

// mutation observers are wierd
var title = document.querySelector("title");
// observer config
var oConfig = { childList: true, subtree: true };

var observer = new MutationObserver(mutationDetected);

async function mutationDetected(mutationsList)
{
  if(debug) {
    console.log("[9 + 10 = 21 DEBUG] mutationsList:");
    console.log(mutationsList);
  } else if (!mutationsList) {
    if(debug) {console.log("[9 + 10 = 21 DEBUG] didn't get a mutationsList :(");}
  }
  observer.disconnect();

  if(debug) {
    console.log("[9 + 10 = 21 DEBUG] about to change title - stopped observing");
  }
  setTitle((tabText) => {
    
    setTimeout((tabTitle) => {
      observer.observe(title, oConfig);
      if(debug) {
        console.log("[9 + 10 = 21 DEBUG] 200ms passed - observing again");
      }
      
      if(title.innerText != tabText) {
        if(debug) {
          console.log("[9 + 10 = 21 DEBUG] missed a title (missed from mutationDetected)! reexecuting function");
        }
        mutationDetected();
      }
    }, 200);
  });
}

observer.observe(title, oConfig);
if(debug) {console.log("[9 + 10 = 21 DEBUG] just started observing i think");}

getExtentionStorage((data) => {
  if(title.innerText != data.tabTitle) {
    if(debug) {
      console.log("[9 + 10 = 21 DEBUG] missed the title (1st time title didn't change)! executing mutationDetected()");
    }
    mutationDetected();
  }
});
