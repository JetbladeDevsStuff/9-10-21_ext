// main.js of QuikSettings for 9 + 10 = 21
// Fuction to save to chrome's local storage
function save() {
    var option = document.getElementsByClassName("choice").value;
    chrome.storage.local.set({"on" : option}, function() {
        // Runs when the action is complete, in this case we want to edit some
        // text so that the user knows their changes were saved
        var saveText = document.getElementById("saveText");
        saveText.innerText = "Saved.";
        // Now we will use setTimeout to clear the text after 1.5 seconds
        setTimeout(function() {saveText.innerText = ''}, 1500);
    })
}

// Adds a listener to the button element for when it is clicked once the DOM 
// is loaded
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('save').addEventListener('click', save);
})