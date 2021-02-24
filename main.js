
status = "";
array = [];
red_alert = "";

function preload(){
    red_alert = loadSound("red_alert.mp3");

}

function setup(){
    canvas = createCanvas(380 , 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object = ml5.objectDetector("cocossd" , model_load);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"

}

function model_load(){
    console.log("COCOSSD LOADED");
    status = true;
    
}

function gotCocossd(error, results){

    if(error){
        console.log(error);

    }

    else{
    console.log(results);
    array = results;
    }
}

function draw(){
    image(video , 0, 0, 380, 350);
    

    if(status != " "){

        if(array.length < 0 ){
            document.getElementById("objects_detected").innerHTML = "Baby Not Found";
            red_alert.play();
        }

        object.detect(video , gotCocossd);
            
        document.getElementById("status").innerHTML = "Status: Object Detect";
        document.getElementById("objects_detected").innerHTML = "Number of objects detected : " + array.length;


        for(i = 0; i < array.length ; i++){
            
            

            r = random(255);
            g = random(255);
            b = random(255);
            fill(r,g,b);
            noFill();          
            stroke(r,g,b);
            rect(array[i].x , array[i].y , array[i].height, array[i].width);


            if(array[i].label == "person"){
                document.getElementById("objects_detected").innerHTML = "Baby Found";
                red_alert.stop();
            }

            else{
                document.getElementById("objects_detected").innerHTML = "Baby Not Found";
                red_alert.play();
            }

         

        }
    }
}