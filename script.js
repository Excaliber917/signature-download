const colorPicker = document.getElementById("textcolorpicker");
const canvas = document.getElementById("mycanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retriveButton = document.getElementById("retriveButton");
const canvascolor = document.getElementById("Background");
const fontsize = document.getElementById("fontsize");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Event listeners for color picker, background color, and font size
colorPicker.addEventListener("change", handleColorChange);
canvascolor.addEventListener("change", handleBackgroundColorChange);
fontsize.addEventListener("change", handleFontSizeChange);

// Event listeners for touch and mouse events on canvas
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("touchstart", handleTouchStart);
canvas.addEventListener("touchmove", handleTouchMove);
canvas.addEventListener("touchend", handleTouchEnd);

// Function to handle color picker change
function handleColorChange(e) {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}

// Function to handle background color change
function handleBackgroundColorChange(e) {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to handle font size change
function handleFontSizeChange(e) {
    ctx.lineWidth = e.target.value;
}

// Function to handle mouse down event
function handleMouseDown(e) {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
}

// Function to handle mouse move event
function handleMouseMove(e) {
    if (isDrawing) {
        draw(e.offsetX, e.offsetY);
    }
}

// Function to handle mouse up event
function handleMouseUp() {
    isDrawing = false;
}

// Function to handle touch start event
function handleTouchStart(e) {
    const touch = e.touches[0];
    isDrawing = true;
    lastX = touch.clientX - canvas.getBoundingClientRect().left;
    lastY = touch.clientY - canvas.getBoundingClientRect().top;
}

// Function to handle touch move event
function handleTouchMove(e) {
    if (isDrawing) {
        const touch = e.touches[0];
        draw(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
    }
}

// Function to handle touch end event
function handleTouchEnd() {
    isDrawing = false;
}

// Function to draw on the canvas
function draw(x, y) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
}

// Event listener for clear button
clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Event listener for save button
saveButton.addEventListener("click", () => {
    if (canvas.toDataURL() === canvas.toDataURL('image/png')) {
        localStorage.setItem('canvasContents', canvas.toDataURL());
        let link = document.createElement('a');
        link.download = 'my-signature.png';
        link.href = canvas.toDataURL();
        link.click();
    } else {
        alert('Canvas has no content to save.');
    }
});

// Event listener for retrieve button
retriveButton.addEventListener("click", () => {
    if (localStorage.getItem('canvasContents')) {
        let img = new Image();
        img.src = localStorage.getItem('canvasContents');
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
});
