// ===============================================================
// Side navigation bar script ====================================

var menuButton = document.getElementById("menuButton");
var closeButton = document.getElementById("closeButton");

// for onclick in html
function openNav() {
    document.getElementById("mySideNav").style.width = "100%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.2)";
}

// for onclick in html
function closeNav() {
    document.getElementById("mySideNav").style.width = "0";
    document.body.style.backgroundColor = "white";
}

// Event listeners for mouse click
menuButton.addEventListener("mousedown", openNav);
closeButton.addEventListener("mousedown", closeNav);

// Event listeners for touch screens
menuButton.addEventListener("ontouchend", openNav);
closeButton.addEventListener("ontouchend", closeNav);
