const socket = new WebSocket (`ws://localhost/`)
socket.onopen = () => console.log (`client websocket opened!`)



// // Get the canvas
// var canvas = document.getElementById("canvas");
// // Convert the canvas to data
// var image = canvas.toDataURL();
// // Create a link
// var aDownloadLink = document.createElement('a');
// // Add the name of the file to the link
// aDownloadLink.download = 'canvas_image.png';
// // Attach the data to the link
// aDownloadLink.href = image;
// // Get the code to click the download link
// aDownloadLink.click();




//canvas1---------------------------------------
// const myDiv = document.querySelector('.container');


document.addEventListener('DOMContentLoaded', function() {


const cnv = document.querySelector("#box1");
cnv.width = innerWidth/5;
cnv.height = innerHeight/4;

const ctx = cnv.getContext (`2d`);

let img = null; 
let draggable = false;
let currentX = cnv.width/2; 
let currentY = cnv.height/2; 

const uploader = document.querySelector("#uploader");
const inputBox = document.querySelector(".form-group.one");


uploader.addEventListener('change',(e) => {
   console.log('upload');
   const myFile = uploader.files[0];
   console.log(myFile.name);

   img = new Image();
   img.src = URL.createObjectURL(myFile);
   
   const resetCanvas = () =>{
      ctx.fillStyle = `white`
      ctx.fillRect (0, 0, innerWidth, innerHeight)
   }
  
   img.onload = () => {
      setInterval(()=>{
         resetCanvas();
         // img.width = 200;
         // img.height = 200;

         ctx.drawImage(img, currentX - img.width/4, currentY - img.height/4, img.width/2, img.height/2);
      }, 200);

   };   

   setTimeout(() => {
      inputBox.classList.toggle("hide");
  }, 100);

 });

cnv.addEventListener("dblclick", toggleInputVisibility)

 function toggleInputVisibility() {
   inputBox.classList.toggle("hide");
 }

//detech if the click is on the image
cnv.onmousedown = (e) =>{

   if (img!== null &&
      e.layerX < (currentX + img.width/2) &&
      e.layerX > (currentX - img.width/2) &&
      e.layerY < (currentY + img.height/2) &&
      e.layerY > (currentY - img.height/2))
      {
         draggable = true;
         console.log("clicked");
      }
   else {
      console.log("nah");
   }
}

cnv.onmousemove = (e) =>{
   if(draggable){
      currentX = e.layerX;
      currentY = e.layerY;
  }
}
cnv.onmouseup = (e) =>{
   draggable = false;
}

cnv.onmouseout = (e) =>{
   draggable = false;
}

window.onresize = () => {
   cnv.width = innerWidth/5
   cnv.height = innerHeight
}
});


//canvas2----------------------------------------



document.addEventListener('DOMContentLoaded', function() {

const cnv2 = document.querySelector("#box2");
cnv2.width = innerWidth/5;
cnv2.height = innerHeight/4;

const ctx2 = cnv2.getContext (`2d`);

let img2 = null; 
let draggable = false;
let current2X = cnv2.width/2; 
let current2Y = cnv2.height/2; 

const uploader2 = document.querySelector("#uploader2");
const inputBox2 = document.querySelector(".form-group.two");


uploader2.addEventListener('change',(e) => {
   console.log('upload');
   const myFile2 = uploader2.files[0];
   console.log(myFile2.name);

   img2 = new Image();
   img2.src = URL.createObjectURL(myFile2);
   
   const resetCanvas = () =>{
      ctx2.fillStyle = `white`
      ctx2.fillRect (0, 0, innerWidth, innerHeight)
   }
  
   img2.onload = () => {
      setInterval(()=>{
         resetCanvas();

         ctx2.drawImage(img2, current2X - img2.width/6, current2Y - img2.height/6, img2.width/3, img2.height/3);
      }, 200);

   };   

setTimeout(() => {
      inputBox2.classList.toggle("hide");
  }, 100);

 });

cnv2.addEventListener("dblclick", toggleInputVisibility)

 function toggleInputVisibility() {
   inputBox2.classList.toggle("hide");
 }

//detech if the click is on the image
cnv2.onmousedown = (e) =>{

   if (img2!== null &&
      e.layerX < (current2X + img2.width) &&
      e.layerX > (current2X - img2.width) &&
      e.layerY < (current2Y + img2.height/2) &&
      e.layerY > (current2Y - img2.height/2))
      {
         draggable = true;
         console.log("clicked");
      }
   else {
      console.log("nah");
   }
}

cnv2.onmousemove = (e) =>{
   if(draggable){
      current2X = e.layerX;
      current2Y = e.layerY;
  }
}
cnv2.onmouseup = (e) =>{
   draggable = false;
}

cnv2.onmouseout = (e) =>{
   draggable = false;
}


window.onresize = () => {
   cnv2.width = innerWidth/5
   cnv2.height = innerHeight/4
}
});