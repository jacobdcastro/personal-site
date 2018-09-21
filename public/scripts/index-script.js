// ===============================================================
// Side navigation bar script =====================================

var menuButton = document.getElementById("menuButton");
var closeButton = document.getElementById("closeButton");

function openNav() {
    document.getElementById("mySideNav").style.width = "100%";
    document.body.style.backgroundColor = "rgba(0,0,0,1)";
}

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



// ================================================================
// Fade-in features at site load ==================================

// social media icon hover
var icons = document.getElementsByClassName("socialIcon");
var hover = "-hover.svg";
var attr;
var newAttr;

for (let i = 0; i <= icons.length; i++) {

  icons[i].addEventListener("mouseover", function () {
    attr = icons[i].getAttribute("src");
    newAttr = attr.slice(0, -4);
    icons[i].setAttribute("src", newAttr + hover);
  });

  icons[i].addEventListener("mouseleave", function () {
    icons[i].setAttribute("src", newAttr + ".svg");
  });
};


// ================================================================
// Experimentation with JSON ======================================

// jQuery AJAX Request
$.getJSON();

// var xhr = new XMLHttpRequest();
//
// xhr.onreadystatechange = function () {
//    if (xhr.readyState === 4 && xhr.status === 200) {
//     var myData = JSON.parse(xhr.responeText);
//     console.log(myData);
//   }
// };
//
// xhr.open('GET', 'json/for-fun.json');
// xhr.send();
