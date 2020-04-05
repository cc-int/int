let filename="";function initCanvas(canvas){canvas.style.width='100%';canvas.style.height='100%';let min=Math.min(canvas.offsetWidth,canvas.offsetHeight);canvas.width=min;canvas.height=min;}
function createGIF(visibleCanvas,img){let MAX_IMG_SCALE_ON_CANVAS=0.75
let CANVAS_WIDTH=visibleCanvas.width;let CANVAS_HEIGHT=visibleCanvas.height;let imgDimensions=calculateImageDimensions(img,CANVAS_WIDTH*MAX_IMG_SCALE_ON_CANVAS,CANVAS_HEIGHT*MAX_IMG_SCALE_ON_CANVAS);let IMAGE_WIDTH=imgDimensions.width;let IMAGE_HEIGHT=imgDimensions.height;let gif=new GIF({workers:2,quality:10,transparent:'rgba(0,0,0,0)'});for(let i=0;i<8;i++){let newCanvas=document.createElement('canvas');newCanvas.width=CANVAS_WIDTH;newCanvas.height=CANVAS_HEIGHT;let imgX=CANVAS_WIDTH/2-IMAGE_WIDTH/2;let imgY=CANVAS_HEIGHT/2-IMAGE_HEIGHT/2;let maxX=CANVAS_WIDTH-IMAGE_WIDTH;let maxY=CANVAS_HEIGHT-IMAGE_HEIGHT;let maxXMove=(maxX-imgX)/2;let maxYMove=(maxY-imgY)/2;let x=imgX+(Math.random()*maxXMove)*(Math.floor(Math.random()*2)==1?1:-1);let y=imgY+(Math.random()*maxYMove)*(Math.floor(Math.random()*2)==1?1:-1);newCanvas.getContext('2d').drawImage(img,x,y,IMAGE_WIDTH,IMAGE_HEIGHT);gif.addFrame(newCanvas,{delay:50});}
gif.on('finished',function(blob){gif.freeWorkers.forEach(w=>w.terminate());$("#step-3-text").hide();visibleCanvas.src=URL.createObjectURL(blob);});gif.render();}
function calculateImageDimensions(img,max_width,max_height){let width=img.width;let height=img.height;if(width>height){if(width>max_width){height=Math.round(height*=max_width/width);width=max_width;}}else{if(height>max_height){width=Math.round(width*=max_height/height);height=max_height;}}
return{'width':width,'height':height}}
function renderImage(file){let img=new Image();img.onload=function(event){let visibleCanvas=document.getElementById('completeGif');initCanvas(visibleCanvas);createGIF(visibleCanvas,img);}
img.src=URL.createObjectURL(file);};$("#right-button").on('click',function(){let files=$("#file-upload-input")[0].files;if(files&&files.length===1){$("#upload-step-1").hide();$("#upload-step-2").hide();$("#upload-step-3").show();$("#step-3-text").show();filename=files[0].name+".gif";renderImage(files[0]);$("#step-1-row").hide();$("#step-3-row").show();}});$("#save-button").on('click',function(){this.href=document.getElementById('completeGif').src;this.download=filename;});$("#file-upload-input").change(function(){if(this.files&&this.files.length===1){$("#upload-step-1").hide();$("#upload-step-2").show();$("#upload-step-3").hide();}});$(document).ready(function(){$('.nav-button').click(function(){$('body').toggleClass('nav-open');});});