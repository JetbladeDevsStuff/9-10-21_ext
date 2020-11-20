// main.js of BigSettings for 9 + 10 = 21
// Fuction to save to chrome's local storage
function save() {
    var option = document.getElementById("choice").value;
    var text = document.getElementById("textBox").value;
    var d_Option = document.getElementById("choice_debug").value;
    chrome.storage.local.set({"on" : option, "tabText" : text, "debug" : d_Option}, () => {
        // Runs when the action is complete, in this case we want to edit some
        // text so that the user knows their changes were saved
        var saveText = document.getElementById("saveText");
        saveText.innerText = "Saved.";
        // Now we will use setTimeout to clear the text after 3 seconds
        setTimeout(() => {saveText.innerText = ''}, 3000);
    });
}

// a function to replace the placeholder text
function replacePlaceholderText() {
  var placeholderBox = document.getElementById("textBox");
  chrome.storage.local.get("tabText", (data) => {
    if(data.tabText !== undefined) {
      placeholderBox.setAttribute("placeholder",data.tabText);
  }});
}

// Adds a listener to the button element for when it is clicked once the DOM
// is loaded
window.addEventListener('DOMContentLoaded', () => {
  replacePlaceholderText();
  document.getElementById('save').addEventListener('click', save);
});