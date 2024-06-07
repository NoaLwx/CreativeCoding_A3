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
cnv.height = innerHeight/4*3;

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

         ctx.drawImage(img, currentX - img.width/4, currentY - img.height/4, img.width/1.5, img.height/1.5);
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
   cnv.height = innerHeight/4*3;
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


//canvas3----------------------------------------

document.addEventListener('DOMContentLoaded', function() {

   const cnv3 = document.querySelector("#box3");
   cnv3.width = innerWidth/5;
   cnv3.height = innerHeight/4;
   
   const ctx3 = cnv3.getContext (`2d`);
   
   let img3 = null; 
   let draggable = false;
   let current3X = cnv3.width/2; 
   let current3Y = cnv3.height/2; 
   
   const uploader3 = document.querySelector("#uploader3");
   const inputBox3 = document.querySelector(".form-group.three");
   
   
   uploader3.addEventListener('change',(e) => {
      console.log('upload');
      const myFile3 = uploader3.files[0];
      console.log(myFile3.name);
   
      img3 = new Image();
      img3.src = URL.createObjectURL(myFile3);
      
      const resetCanvas = () =>{
         ctx3.fillStyle = `white`
         ctx3.fillRect (0, 0, innerWidth, innerHeight)
      }
     
      img3.onload = () => {
         setInterval(()=>{
            resetCanvas();
   
            ctx3.drawImage(img3, current3X - img3.width/6, current3Y - img3.height/6, img3.width/3, img3.height/3);
         }, 200);
   
      };   
   
   setTimeout(() => {
         inputBox3.classList.toggle("hide");
     }, 100);
   
    });
   
   cnv3.addEventListener("dblclick", toggleInputVisibility)
   
    function toggleInputVisibility() {
      inputBox3.classList.toggle("hide");
    }
   
   //detech if the click is on the image
   cnv3.onmousedown = (e) =>{
   
      if (img3!== null &&
         e.layerX < (current3X + img3.width) &&
         e.layerX > (current3X - img3.width) &&
         e.layerY < (current3Y + img3.height/2) &&
         e.layerY > (current3Y - img3.height/2))
         {
            draggable = true;
            console.log("clicked");
         }
      else {
         console.log("nah");
      }
   }
   
   cnv3.onmousemove = (e) =>{
      if(draggable){
         current3X = e.layerX;
         current3Y = e.layerY;
     }
   }
   cnv3.onmouseup = (e) =>{
      draggable = false;
   }
   
   cnv3.onmouseout = (e) =>{
      draggable = false;
   }
   
   
   window.onresize = () => {
      cnv3.width = innerWidth/5
      cnv3.height = innerHeight/4
   }
   });
   
//canvas4----------------------------------------

document.addEventListener('DOMContentLoaded', function() {

   const cnv4 = document.querySelector("#box4");
   cnv4.width = innerWidth/5*2;
   cnv4.height = innerHeight/4;
   
   const ctx4 = cnv4.getContext (`2d`);
   
   let img4 = null; 
   let draggable = false;
   let current4X = cnv4.width/2; 
   let current4Y = cnv4.height/2; 
   
   const uploader4 = document.querySelector("#uploader4");
   const inputBox4 = document.querySelector(".form-group.four");
   
   
   uploader4.addEventListener('change',(e) => {
      console.log('upload');
      const myFile4 = uploader4.files[0];
      console.log(myFile4.name);
   
      img4 = new Image();
      img4.src = URL.createObjectURL(myFile4);
      
      const resetCanvas = () =>{
         ctx4.fillStyle = `white`
         ctx4.fillRect (0, 0, innerWidth, innerHeight)
      }
     
      img4.onload = () => {
         setInterval(()=>{
            resetCanvas();
   
            ctx4.drawImage(img4, current4X - img4.width/6, current4Y - img4.height/6, img4.width/2, img4.height/2);
         }, 200);
   
      };   
   
   setTimeout(() => {
         inputBox4.classList.toggle("hide");
     }, 100);
   
    });
   
   cnv4.addEventListener("dblclick", toggleInputVisibility)
   
    function toggleInputVisibility() {
      inputBox4.classList.toggle("hide");
    }
   
   //detech if the click is on the image
   cnv4.onmousedown = (e) =>{
   
      if (img4!== null &&
         e.layerX < (current4X + img4.width) &&
         e.layerX > (current4X - img4.width) &&
         e.layerY < (current4Y + img4.height/2) &&
         e.layerY > (current4Y - img4.height/2))
         {
            draggable = true;
            console.log("clicked");
         }
      else {
         console.log("nah");
      }
   }
   
   cnv4.onmousemove = (e) =>{
      if(draggable){
         current4X = e.layerX;
         current4Y = e.layerY;
     }
   }
   cnv4.onmouseup = (e) =>{
      draggable = false;
   }
   
   cnv4.onmouseout = (e) =>{
      draggable = false;
   }
   
   
   window.onresize = () => {
      cnv4.width = innerWidth/5
      cnv4.height = innerHeight/4
   }
   });

//canvas5----------------------------------------

document.addEventListener('DOMContentLoaded', function() {

   const cnv5 = document.querySelector("#box5");
   cnv5.width = innerWidth/5*2;
   cnv5.height = innerHeight/4*2;
   
   const ctx5 = cnv5.getContext (`2d`);
   
   let img5 = null; 
   let draggable = false;
   let current5X = cnv5.width/2; 
   let current5Y = cnv5.height/2; 
   
   const uploader5 = document.querySelector("#uploader5");
   const inputBox5 = document.querySelector(".form-group.five");
   
   
   uploader5.addEventListener('change',(e) => {
      console.log('upload');
      const myFile5 = uploader5.files[0];
      console.log(myFile5.name);
   
      img5 = new Image();
      img5.src = URL.createObjectURL(myFile5);
      
      const resetCanvas = () =>{
         ctx5.fillStyle = `white`
         ctx5.fillRect (0, 0, innerWidth, innerHeight)
      }
     
      img5.onload = () => {
         setInterval(()=>{
            resetCanvas();
   
            ctx5.drawImage(img5, current5X - img5.width/6, current5Y - img5.height/6, img5.width/2, img5.height/2);
         }, 200);
   
      };   
   
   setTimeout(() => {
         inputBox5.classList.toggle("hide");
     }, 100);
   
    });
   
   cnv5.addEventListener("dblclick", toggleInputVisibility)
   
    function toggleInputVisibility() {
      inputBox5.classList.toggle("hide");
    }
   
   //detech if the click is on the image
   cnv5.onmousedown = (e) =>{
   
      if (img5!== null &&
         e.layerX < (current5X + img5.width) &&
         e.layerX > (current5X - img5.width) &&
         e.layerY < (current5Y + img5.height/2) &&
         e.layerY > (current5Y - img5.height/2))
         {
            draggable = true;
            console.log("clicked");
         }
      else {
         console.log("nah");
      }
   }
   
   cnv5.onmousemove = (e) =>{
      if(draggable){
         current5X = e.layerX;
         current5Y = e.layerY;
     }
   }
   cnv5.onmouseup = (e) =>{
      draggable = false;
   }
   
   cnv5.onmouseout = (e) =>{
      draggable = false;
   }
   
   
   window.onresize = () => {
      cnv5.width = innerWidth/5*2
      cnv5.height = innerHeight/4*2
   }
   });


//canvas6----------------------------------------

document.addEventListener('DOMContentLoaded', function() {

   const cnv6 = document.querySelector("#box6");
   cnv6.width = innerWidth/5*2;
   cnv6.height = innerHeight/4;
   
   const ctx6= cnv6.getContext (`2d`);
   
   let img6 = null; 
   let draggable = false;
   let current6X = cnv6.width/2; 
   let current6Y = cnv6.height/2; 
   
   const uploader6 = document.querySelector("#uploader6");
   const inputBox6 = document.querySelector(".form-group.six");
   
   
   uploader6.addEventListener('change',(e) => {
      console.log('upload');
      const myFile6 = uploader6.files[0];
      console.log(myFile6.name);
   
      img6 = new Image();
      img6.src = URL.createObjectURL(myFile6);
      
      const resetCanvas = () =>{
         ctx6.fillStyle = `white`
         ctx6.fillRect (0, 0, innerWidth, innerHeight)
      }
     
      img6.onload = () => {
         setInterval(()=>{
            resetCanvas();
   
            ctx6.drawImage(img6, current6X - img6.width/6, current6Y - img6.height/6, img6.width/2, img6.height/2);
         }, 200);
   
      };   
   
   setTimeout(() => {
         inputBox6.classList.toggle("hide");
     }, 100);
   
    });
   
   cnv6.addEventListener("dblclick", toggleInputVisibility)
   
    function toggleInputVisibility() {
         inputBox6.classList.toggle("hide");
    }
   
   //detech if the click is on the image
   cnv6.onmousedown = (e) =>{
   
      if (img6!== null &&
         e.layerX < (current6X + img6.width) &&
         e.layerX > (current6X - img6.width) &&
         e.layerY < (current6Y + img6.height/2) &&
         e.layerY > (current6Y - img6.height/2))
         {
            draggable = true;
            console.log("clicked");
         }
      else {
         console.log("nah");
      }
   }
   
   cnv6.onmousemove = (e) =>{
      if(draggable){
         current6X = e.layerX;
         current6Y = e.layerY;
     }
   }
   cnv6.onmouseup = (e) =>{
      draggable = false;
   }
   
   cnv6.onmouseout = (e) =>{
      draggable = false;
   }
   
   
   window.onresize = () => {
      cnv6.width = innerWidth/5*2
      cnv6.height = innerHeight/4
   }
   });





//----------------------------------------------------

// function dropHandler(ev) {
//    console.log("File(s) dropped");
 
//    // Prevent default behavior (Prevent file from being opened)
//    ev.preventDefault();
 
//    if (ev.dataTransfer.items) {
//      // Use DataTransferItemList interface to access the file(s)
//      [...ev.dataTransfer.items].forEach((item, i) => {
//        // If dropped items aren't files, reject them
//        if (item.kind === "file") {
//          const file = item.getAsFile();
//          console.log(`… file[${i}].name = ${file.name}`);
//        }
//      });
//    } else {
//      // Use DataTransfer interface to access the file(s)
//      [...ev.dataTransfer.files].forEach((file, i) => {
//        console.log(`… file[${i}].name = ${file.name}`);
//      });
//    }
//  }

//  function dragOverHandler(ev) {
//    console.log("File(s) in drop zone");
 
//    // Prevent default behavior (Prevent file from being opened)
//    ev.preventDefault();
//  }
 
 