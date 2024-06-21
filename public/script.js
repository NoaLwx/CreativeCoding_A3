// this project is to create a share canvas where we can input images and create a collage
// even though it would be better for it to record the data of the position on each client's socket 
// i think it's more interesting where we have the same images but are rearranged to create different outcome
// people can also download the canvas


// defining the canvas size
const cnv = document.querySelector("#box");
cnv.width = 1500;
cnv.height = cnv.width * 9/16;
const ctx = cnv.getContext('2d');

//--------------------------------------------------------------

const socket = new WebSocket (`wss://s4004087-a3.deno.dev/`)
// const socket = new WebSocket (`ws://localhost/`) 

socket.onopen  = () => {
    console.log (`client websocket opened`)
}

socket.onclose = () => console.log (`client websocket closed`)
socket.onerror =  e => console.dir (e)

// to be honest I don't know why this is here but I don't want to mess with the codes
const squares = []

// creating an array for images 
let images = [];

// creating the initial position for the images
let currentX = cnv.width / 2;
let currentY = cnv.height / 2;

// async function allow await to work
async function initApp() {

// sending the data collected from the socket to other sockets in the same server
    socket.onmessage = e => {
        console.log (`websocket message received:`, e.data)

        // getting the data from the server
        const receivedData = JSON.parse(e.data);

        // create a new image from the url taken from the server
        const newImg = new Image();
        newImg.src = receivedData.imgData;
        
        // Draw the new image once it loads
        newImg.onload = () => {
            // ctx.drawImage(newImg, receivedData.x, receivedData.y, receivedData.width / 4, receivedData.height / 4);
        
        // push and draw the images with the data receive from the server
        // this will ensure that it take all the image data (source, position, dimension) 
        // from the server and put it in each socket canvas
        const ImageObjectData = {
            img: newImg,
            imgData: receivedData.imgData,
            x: receivedData.x,
            y: receivedData.y,
            width: receivedData.width,
            height: receivedData.height,
            dragging: false  
        };
        images.push(ImageObjectData);
        drawImages();
        };
    };

    // getting the input function from the html
    const uploader = document.querySelector("#uploader");
    const inputBox = document.querySelector(".form-group");

    // getting the position of the mouse for the dragging event later
    let lastMouseX = 0;
    let lastMouseY = 0;

    // define the function for when there is an input image
    // this will listen to the change of the canvas
    uploader.addEventListener('change', (e) => {
        console.log('upload');
        
        // creating an array for the images that got uploaded through the input button
        const myFile = uploader.files[0];
     
        // create new images from the url of the uploaded files
        const img = new Image();
        img.src = URL.createObjectURL(myFile);

        // load the images
        img.onload = () => {

        // create a much smaller separated canvas from the main one
        // so that the data is small enough to pass through the socket without messing up the
        // size of the database (they only allow a certain amount of data)
        // and big enough to not destroy the image pixels
        const imageCanvas = document.createElement('canvas');
        imageCanvas.width = 200;
        imageCanvas.height = img.height / img.width * imageCanvas.width; // calculate the aspect ratio of the image
        console.log (imageCanvas.width); // check the imageCanvas size
        const imageContext = imageCanvas.getContext('2d');

        // drawing the input image on the canvas separatedly to put this in the data transfer
        imageContext.drawImage(img,0,0, imageCanvas.width, imageCanvas.height);

        // turn the image inside the imageCanvas into an string so that it can be transfer through the socket
        const imgData = imageCanvas.toDataURL('image/jpeg');

            // getting the data from the imageCanvas 
            const ImageObject = {
                img: img,
                imgData: imgData, // the data of the image now is smaller
                x: currentX,
                y: currentY,
                width: img.width,
                height: img.height,
                dragging: false
            }

                // images.push(ImageObject);
                // drawImages();
            // I commented these two out so that it doesn't draw another image 
            // appart from the data image it got from the server

            console.log (imgData);
            socket.send(JSON.stringify(ImageObject)); // send the stringified ImageObject to the server
            
            // this function send the data of the input images to the server before drawing them onto the canvas
            // then with the socket.onmessage above, they will get that input data 
            // and push that image data into the arrays
            // then draw them onto the canvas with the drawImage function down below
        };     
    });

// function for drawing the images in the arrays onto the canvas
function drawImages() {

    // clearing the canvas to prevent collision
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    // for each image in the images array, draw them with 1/4 the size
    images.forEach((image) => {
        ctx.drawImage(image.img, image.x, image.y, image.width/4, image.height/4);
    });
}

//----------------------------------------------------------------------------------------
// dragging functions
cnv.onmousedown = handleMouseDown;
cnv.onmousemove = handleMouseMove;
cnv.onmouseup = handleMouseUp;
cnv.onmouseout = handleMouseOut;

// define the selected images so that the new images from the server data can be draggable too
let selectedImage = null;

// function for when clicking on the image
function handleMouseDown(e) {

// getting the position of the mouse/ pointer
const mouseX = e.layerX;
const mouseY = e.layerY;
lastMouseX = mouseX;
lastMouseY = mouseY;
    
 // check if mouse is over any image
selectedImage = images.find(image => {

    //draggable area of the images
    return mouseX >= image.x && 
        mouseX <= image.x + image.width/4 &&
        mouseY >= image.y && 
        mouseY <= image.y + image.height/4;
        });
    // if the pointer is on the draggable area, let the dragging be true
    if (selectedImage) {
        selectedImage.dragging = true;
        }
};

// function for then dragging the images
function handleMouseMove(e) {
    // if it's not the selected image, stop dragging
    if (!selectedImage) return;

    const mouseX = e.layerX;
    const mouseY = e.layerY;
    
    // calculate the last dropped position so that people can drag the images without reseting the position
    if (selectedImage.dragging) {
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
    
        selectedImage.x += dx;
        selectedImage.y += dy;
    
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    
        drawImages(); // draw the image on the new position
        }
    };

function handleMouseUp(e) {
    if (selectedImage) {
        selectedImage.dragging = false;
        selectedImage = null;
        }
    };

function handleMouseOut(e) {
    if (selectedImage) {
        selectedImage.dragging = false;
        selectedImage = null;
        }
    };

//----------------------------------------------------------------------------------------
// dragging function for touchpad/tablet/mobile  
cnv.addEventListener('touchstart', handleTouchStart);
cnv.addEventListener('touchmove', handleTouchMove,);
cnv.addEventListener('touchend', handleTouchEnd,);

function handleTouchStart(e) {
    e.preventDefault(); // Prevent scrolling on touch devices
    const touch = e.touches[0];
    handleMouseDown({ layerX: touch.clientX, layerY: touch.clientY });
  }

function handleTouchMove(e) {
    e.preventDefault(); // Prevent scrolling on touch devices
    const touch = e.touches[0];
    handleMouseMove({ layerX: touch.clientX, layerY: touch.clientY });
  }

function handleTouchEnd(e) {
    e.preventDefault(); // Prevent scrolling on touch devices
    handleMouseUp();
  }

//----------------------------------------------------------------------------------------

// resize the canvas when resizing the window (keeping the aspect ratio even when is resized)
window.onresize = () => {
    cnv.width = 1500;
    cnv.height = cnv.width * 9/16;
    drawImages(); 
    };

// download button for the canvas
document.getElementById('downloadBtn').addEventListener('click', function() {
    const dataURL = cnv.toDataURL('image/png'); // getting the data of the whole canvas
    const link = document.createElement('a'); // creating the link
    link.href = dataURL; // get the data link, which is the canvas
    link.download = 'canvas.png'; // download it as a png 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    });

// reseting the canvas function
document.getElementById('deleteBtn').addEventListener('click', function() {
    ctx.clearRect (0, 0, cnv.width, cnv.height)
    images.length = 0; // when clicked, delete all the images in the array
    });
}

// ensures that initApp runs as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', initApp);


  
