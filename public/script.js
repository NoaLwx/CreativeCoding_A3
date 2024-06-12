
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

    
//------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const cnv = document.querySelector("#box");
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
    const ctx = cnv.getContext('2d');

    let images = [];
    let currentX = cnv.width / 2;
    let currentY = cnv.height / 2;

    let lastMouseX = 0;
    let lastMouseY = 0;

    const uploader = document.querySelector("#uploader");
    const inputBox = document.querySelector(".form-group.one");

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
            localStorage.setItem("canvasData", canvasDataUrl);
            drawImages();
        };

        setTimeout(() => {
            inputBox.classList.toggle("hide");
        }, 100);
    });

    function drawImages() {
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        images.forEach((image) => {
            ctx.drawImage(image.img, image.x - image.img.width/16, image.y - image.img.height/16, image.img.width/8, image.img.height/8);
        });
    }

    cnv.addEventListener("dblclick", toggleInputVisibility);

    function toggleInputVisibility() {
        inputBox.classList.toggle("hide");
    }

    cnv.onmousedown = (e) => {
        images.forEach((image) => { // Corrected to iterate through images
            if (image.dragging === false && 
                e.layerX > image.x - image.img.height/8 && 
                e.layerX < image.x + image.img.width/8 && 
                e.layerY > image.y - image.img.height/8 && 
                e.layerY < image.y + image.img.height/8) 
                {
                image.dragging = true;
                lastMouseX = e.layerX;
                lastMouseY = e.layerY;
            }
        });
    };

    cnv.onmousemove = (e) => {
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

    cnv.onmouseup = (e) => {
        images.forEach((image) => {
            image.dragging = false;
        });
    };

    cnv.onmouseout = (e) => {
        images.forEach((image) => {
            image.dragging = false;
        });
    };

    window.onresize = () => {
        cnv.width = window.innerWidth - 20;
        cnv.height = window.innerHeight - 20;
        drawImages(); 
    };

    const savedDataUrl = localStorage.getItem("canvasData");
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

});


