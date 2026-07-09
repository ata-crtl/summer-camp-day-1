/*
let string = "hello world";
let numbers = 34 ;
let arary = [ 4, 5, 6,7 ];
let object = {
    name: "ataullah",
    job: "wallamrt",
    age: 16
}

console.log(string);
console.log(numbers);
console.log(arary[0])
console.log(object.name);
 alert("hello world")

///funnction now below

function hello(input){
    console.log(input);
}
hello("hello")

//// loops 
let i = 0
while(i == 0 ){
    console.log("i = zero !")
    i++;
}
/// conditionals

if (i == 1){
    console.log("i is equal to one");
}
/// not going to run
if (i != 1){
    console.log("i is not 1")
}
*/


const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
const toggleBtn = document.getElementById('matrix-toggle'); // Matches id="matrix-toggle" in HTML

let animationId = null;
let isActive = false;

// Characters used in the digital rain
const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabet = chars.split("");

const fontSize = 16;
let columns = 0;
let rainDrops = [];

// Adjust the canvas size to the full window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Set up initial coordinate points for the digital rain
function initRain() {
    columns = Math.floor(canvas.width / fontSize);
    rainDrops = [];
    for (let x = 0; x < columns; x++) {
        // Stagger the starting Y positions so the grid fills naturally on launch
        rainDrops[x] = Math.floor(Math.random() * (canvas.height / fontSize));
    }
}

// Drawing loop
function draw() {
    // Draw a semi-transparent black rectangle over the previous frame to create a fading tail trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Matrix green color
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        // Select a random character
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        
        // X position is determined by column index, Y is determined by drop index
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop back to the top once it hits the bottom (with a small random delay)
        if (y > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        
        // Move drop downward
        rainDrops[i]++;
    }
}

// Animation runner
function loop() {
    draw();
    animationId = requestAnimationFrame(loop);
}

// Start the effect
function startMatrix() {
    canvas.style.display = 'block';
    resizeCanvas();
    initRain();
    loop();
    toggleBtn.textContent = 'Exit the Matrix';
    window.addEventListener('resize', handleResize);
}

// Stop the effect and clear the animation frame
function stopMatrix() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    canvas.style.display = 'none';
    toggleBtn.textContent = 'Enter the Matrix';
    window.removeEventListener('resize', handleResize);
}

// Handle window resizing dynamically
function handleResize() {
    resizeCanvas();
    initRain();
}

// Toggle button event listener
toggleBtn.addEventListener('click', () => {
    isActive = !isActive;
    if (isActive) {
        startMatrix();
    } else {
        stopMatrix();
    }
});