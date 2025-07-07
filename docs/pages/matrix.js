var canvas = document.getElementById('matrixCanvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set initial background color to black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
// canvas.style.opacity=1

var chars = 'アァイゥエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
var fontSize = 16;
var columns = Math.floor(canvas.width / fontSize);
var drops = Array(columns).fill(1);

var mouseX = 0;
window.addEventListener('mousemove', function (e) {
  mouseX = e.clientX;
});

function draw() {
  // Set a semi-transparent black background to give a "trailing" effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Adjust alpha value for fade effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set the color for the text (green)
  ctx.fillStyle = '#0f0';
  ctx.font = fontSize + 'px monospace';

  var speed = 1 + mouseX / canvas.width * 2;

  // Loop through each column
  for (var i = 0; i < columns; i++) {
    var text = chars[Math.floor(Math.random() * chars.length)];
    var x = i * fontSize;
    var y = drops[i] * fontSize;

    // Draw the character on the canvas
    ctx.fillText(text, x, y);

    // Reset drop if it exceeds the bottom
    if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;

    // Increase the drop position
    drops[i] += speed;
  }

  requestAnimationFrame(draw);
}

// Start the drawing loop
draw();

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});
