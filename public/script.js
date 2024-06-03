document.body.style.margin   = 0
document.body.style.overflow = `hidden`

const cnv = document.querySelector("#canvas");
cnv.width = 1000
cnv.height = 800

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
  
   img.onload = () => {
      setInterval(()=>{
         ctx.drawImage(img, currentX - img.width/2, currentY - img.height/2);
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
      currentX = e.layerX - img.width / 2;
      currentY = e.layerY - img.height / 2;
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

// window.onresize = () => {
//    cnv.width = innerWidth
//    cnv.height = innerHeight   
// }