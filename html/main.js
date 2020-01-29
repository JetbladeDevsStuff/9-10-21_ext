// main.js of QuikSettings for 9 + 10 = 21
// Save to chrome's storage
function save() {
    var option = document.getElementsByClassName("choice").value;
    chrome.storage.local.set({"on" : option}, function() {
        // Runs when the action is complete, in this case we want to edit some
        // text so that the user knows their changes were saved
        var text = document.getElementsByClassName("saveText");
        text.textContent = "Saved.";
    })
}

// Adds a listener to the button element for when it is clicked once the DOM 
// is loaded
document.addEventListener("load", function() {
    var button = document.getElementById("save")
    button.addEventListener('click', save);
})