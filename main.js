video=""
object=[];
function preload(){
 video=createVideo('video.mp4');
 video.hide();

}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}


function draw(){
image(video,0,0,480,380);
 if(status!=""){
    r=random(255)
    g=random(255)
    b=random(255)
    objectDetector.detect(video,gotResult);
    for(i=0;i<object.length;i++)
    {
        document.getElementById("status").innerHTML="status:Object Detected";
        document.getElementsById("number_of_objects").innerHTML="number of objects detected are :"+object.length;
        fill(r,g,b);
        percent = floor(object[i].confidence * 100);
        text (object[i].label+""+percent+"%",object[i].x+15,object[i].y+15);
        noFill();
        stroke(r,b,g);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
    }

     }
 }
 


function gotResult(error,results){ 
 if(error){
     console.log(error);
 }
  console.log(results);
  objects=results;
}


function modelLoaded(){
console.log("Model Loaded");
status=true;
video.loop();
video.speed(1);
video.volume(0);
}

function start(){
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status:detecting Objects";
}