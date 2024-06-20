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


const squares = []

let images = [];
    let currentX = cnv.width / 2;
    let currentY = cnv.height / 2;



async function initApp() {

socket.onmessage = e => {
        console.log (`websocket message received:`, e.data)
    
        const receivedData = JSON.parse(e.data);
    
        const newImg = new Image();
        newImg.src = receivedData.imgData;
        
        // Draw the new image once it loads
        newImg.onload = () => {
            // ctx.drawImage(newImg, receivedData.x, receivedData.y, receivedData.width / 4, receivedData.height / 4);
        
        const ImageObjectData = {
            img: newImg,
            imgData: receivedData.imgData,
            x: receivedData.x,
            y: receivedData.y,
            width: receivedData.width,
            height: receivedData.height,
            dragging: false  // Ensure to initialize dragging state
        };
        images.push(ImageObjectData);
        drawImages();
    };
};

const uploader = document.querySelector("#uploader");
const inputBox = document.querySelector(".form-group");

    

    let lastMouseX = 0;
    let lastMouseY = 0;

    uploader.addEventListener('change', (e) => {
        console.log('upload');
        const myFile = uploader.files[0];
     
        const img = new Image();
        img.src = URL.createObjectURL(myFile);

        img.onload = () => {

        const imageCanvas = document.createElement('canvas');
        imageCanvas.width = 300;
        imageCanvas.height = img.height / img.width * imageCanvas.width;

        console.log (imageCanvas.width);
        const imageContext = imageCanvas.getContext('2d');
        imageContext.drawImage(img,0,0, imageCanvas.width, imageCanvas.height);

        const imgData = imageCanvas.toDataURL('image/jpeg');

            const ImageObject = {
                img: img,
                imgData: imgData,
                x: currentX,
                y: currentY,
                width: img.width,
                height: img.height,
                dragging: false
            }
            // ImageObject.dragging = false;
            // images.push(ImageObject);
            
            // drawImages();
            // const imageData = JSON.stringify(ImageObject);
            // socket.send (imgData);
            console.log (imgData);
            
            socket.send(JSON.stringify(ImageObject));
            
        };     
    });

 function drawImages() {

    ctx.clearRect(0, 0, cnv.width, cnv.height);
    images.forEach((image) => {
        ctx.drawImage(image.img, image.x, image.y, image.width/4, image.height/4);
    });
 }

    cnv.onmousedown = handleMouseDown;
    cnv.onmousemove = handleMouseMove;
    cnv.onmouseup = handleMouseUp;
    cnv.onmouseout = handleMouseOut;

    let selectedImage = null;

    function handleMouseDown(e) {
        const mouseX = e.layerX;
        const mouseY = e.layerY;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    
        // Check if mouse is over any image
        selectedImage = images.find(image => {
            return mouseX >= image.x && 
                   mouseX <= image.x + image.width/4 &&
                   mouseY >= image.y && 
                   mouseY <= image.y + image.height/4;
        });
    
        if (selectedImage) {
            selectedImage.dragging = true;
        }
    };


    function handleMouseMove(e) {
        if (!selectedImage) return;

        const mouseX = e.layerX;
        const mouseY = e.layerY;
    
        if (selectedImage.dragging) {
            const dx = mouseX - lastMouseX;
            const dy = mouseY - lastMouseY;
    
            selectedImage.x += dx;
            selectedImage.y += dy;
    
            lastMouseX = mouseX;
            lastMouseY = mouseY;
    
            drawImages();
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

    // window.onresize = () => {
    //     cnv.width = 2000;
    //     cnv.height = cnv.width * 9/16;
    //     drawImages(); 
    // };

    document.getElementById('downloadBtn').addEventListener('click', function() {
        const dataURL = cnv.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    document.getElementById('deleteBtn').addEventListener('click', function() {
        ctx.clearRect (0, 0, cnv.width, cnv.height)
        images.length = 0; 


  });

}

document.addEventListener('DOMContentLoaded', initApp);


//-----------------------------------------------------------------------

  
//it said that it doesn't support the screen.orientation.lock() so i sticked to a fix canvas size