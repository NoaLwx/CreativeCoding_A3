document.body.style.margin   = 0
document.body.style.overflow = `hidden`

const cnv = document.querySelector("#canvas");
// cnv.width = innerWidth
// cnv.height = 800

const ctx = cnv.getContext (`2d`);

document.addEventListener('DOMContentLoaded', function() {

let img = null; 
let draggable = false;
let currentX = cnv.width/2; 
let currentY = cnv.height/2; 

const uploader = document.querySelector("#uploader");


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

         ctx.drawImage(img, currentX - img.width/10, currentY - img.height/10, img.width/2,img.height/2);
      }, 200);

   };
 });

//detech if the click is on the image
cnv.onmousedown = (e) =>{
   if (img!== null &&
      e.layerX < (currentX + cnv.width/2) &&
      e.layerX > (currentX - cnv.width/2) &&
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
});


// cnv.onmousedown(){

// }

// const draw_frame = () => {
//    ctx.fillStyle = `pink`
//    ctx.fillRect (0, 0, innerWidth, innerHeight)

//    requestAnimationFrame (draw_frame)
// }

// draw_frame ()

window.onresize = () => {
   cnv.width = 300
   cnv.height = 300   
}