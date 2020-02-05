// main.js of BigSettings for 9 + 10 = 21
// Fuction to save to chrome's local storage
function save() {
    var option = document.getElementById("choice").value;
    var text = document.getElementById("textBox").value;
    chrome.storage.local.set({"on" : option, "tabText" : text}, function() {
        // Runs when the action is complete, in this case we want to edit some
        // text so that the user knows their changes were saved
        var saveText = document.getElementById("saveText");
        saveText.innerText = "Saved.";
        // Now we will use setTimeout to clear the text after 3 seconds
        setTimeout(function() {saveText.innerText = ''}, 3000);
    })
}

// Adds a listener to the button element for when it is clicked once the DOM 
// is loaded
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('save').addEventListener('click', save);
})