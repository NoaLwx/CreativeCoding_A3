
const socket = new WebSocket (`wss://hanhlu-a3.deno.dev/`)
socket.onopen  = () => console.log (`client websocket opened`)
socket.onclose = () => console.log (`client websocket closed`)
socket.onerror =  e => console.dir (e)

const squares = []

socket.onmessage = e => {
    console.log (`websocket message received:`)

    // convert the string back into an object
    const pos = JSON.parse (e.data)

    // add the position object to the squares array
    squares.push (pos)

    // display the position object in the console
    console.dir (pos)
}

//----------------------------------------------------------------------
    
// import { serve } from "https://deno.land/std/http/server.ts";
import { open } from "https://deno.land/std/fs/mod.ts";
const kv = await open("./my-kv-store.kv");
// i imported those in the server.js??


// const kv = await Deno.openKv();

// also the canvas reset to it original size when i add the deno in
//even with the on above
await kv.put("canvasData", canvasDataUrl);


async function initApp() {

    const cnv = document.querySelector("#box");
    cnv.width = 2000;
    cnv.height = cnv.width * 9/16;

    const ctx = cnv.getContext('2d');

    let images = [];
    let currentX = cnv.width / 2;
    let currentY = cnv.height / 2;

    let lastMouseX = 0;
    let lastMouseY = 0;

    const uploader = document.querySelector("#uploader");
    const inputBox = document.querySelector(".form-group");

    uploader.addEventListener('change', (e) => {
        console.log('upload');
        const myFile = uploader.files[0];

        const img = new Image();
        img.src = URL.createObjectURL(myFile);

        img.onload = () => {
            
            images.push({ 
                img: img,
                x: currentX,
                y: currentY,
                dragging: false
            });

            const canvasDataUrl = cnv.toDataURL();

            //deno kv here. the await doesn't work. 

            // await kv.put("canvasData", canvasDataUrl);

            // i tried follow what the tutorial on mdn website did
            // sorry for keep asking you i can't work this out for some reason
            //

            drawImages();
        };

        setTimeout(() => {
            inputBox.classList.toggle("hide");
        }, 100);
    });

    function drawImages() {
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        images.forEach((image) => {
            ctx.drawImage(image.img, image.x , image.y , image.img.width/8, image.img.height/8);
        });
    }

    cnv.addEventListener("dblclick", toggleInputVisibility);

    function toggleInputVisibility() {
        inputBox.classList.toggle("hide");
    }

    cnv.onmousedown = handleMouseDown;
    cnv.onmousemove = handleMouseMove;
    cnv.onmouseup = handleMouseUp;
    cnv.onmouseout = handleMouseOut;

    function handleMouseDown(e) {
        images.forEach((image) => { // Corrected to iterate through images
            if (image.dragging === false && 
                e.layerX > image.x && 
                e.layerX < image.x + image.img.width/8 && 
                e.layerY > image.y && 
                e.layerY < image.y + image.img.height/8) 
                {
                image.dragging = true;
                lastMouseX = e.layerX;
                lastMouseY = e.layerY;
            }
        });
    };

    function handleMouseMove(e) {
        if (images.some(image => image.dragging)) {
            images.forEach((image) => {
                if (image.dragging) {
                    const deltaX = e.layerX - lastMouseX;
                    const deltaY = e.layerY - lastMouseY;
                    image.x += deltaX;
                    image.y += deltaY;
                    lastMouseX = e.layerX;
                    lastMouseY = e.layerY;
                }
            });
            drawImages();
        }
    };

    function handleMouseUp(e) {
        images.forEach((image) => {
            image.dragging = false;
        });
    };

    function handleMouseOut(e) {
        images.forEach((image) => {
            image.dragging = false;
        });
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

    window.onresize = () => {
        cnv.width = 2000;
        cnv.height = cnv.width * 9/16;
        drawImages(); 
    };

    //deno kv here!!
    const savedDataUrl = await kv.get("canvasData");
    //
    if (savedDataUrl) {
        const imgFromDataUrl = new Image();
        imgFromDataUrl.onload = function() {
            ctx.drawImage(imgFromDataUrl, 0, 0, cnv.width, cnv.height); // Draw the image
        };
        imgFromDataUrl.src = savedDataUrl;
    }

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
         ctx.fillStyle = `white`
         ctx.fillRect (0, 0, innerWidth, innerHeight)
   
  });
};

document.addEventListener('DOMContentLoaded', initApp);


//-----------------------------------------------------------------------



// function lockScreenOrientation(orientation) {
//     if ('screen' in navigator && 'orientation' in screen && screen.orientation) {
//         screen.orientation.lock(orientation).then(function() {
//             console.log(`Screen locked to ${orientation}`);
//         }).catch(function(error) {
//             console.error('Failed to lock screen orientation:', error);
//             // Fallback or notify user
//         });
//     } else {
//         console.warn('Screen orientation lock is not supported on this device.');
//         // Fallback or notify user
//     }
// }

// // Example usage
// lockScreenOrientation('landscape');
  
//it said that it doesn't support the screen.orientation.lock() so i sticked to a fix canvas size