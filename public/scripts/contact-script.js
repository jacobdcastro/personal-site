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


// ===============================================================
// Form buttons for contact ======================================
const proForm = document.getElementById('projectForm');
const genForm = document.getElementById('genForm');
proForm.style.display = 'none';
genForm.style.display = 'none';

function showGenForm() {
  console.log('Show General Form');
  if (proForm.style.display !== 'none') {
    proForm.style.display = 'none';
  }
  if (genForm.style.display === 'none') {
    genForm.style.display = 'flex';
  } else {
    genForm.style.display = 'none';
  }
} // end showGenForm()

function showProjectForm() {
  console.log('Show Project Form');
  if (genForm.style.display !== 'none') {
    genForm.style.display = 'none';
  }
  if (proForm.style.display === 'none') {
    proForm.style.display = 'flex';
  } else {
    proForm.style.display = 'none';
  }
} // end showProjectForm()

// test comment
