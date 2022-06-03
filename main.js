song1= "";
song2= "";

song1_status= "";
song2_status= "";

left_wrist_x= 0;
left_wrist_y= 0;
right_wrist_x= 0;
right_wrist_y= 0;

score_left_wrist= 0;
score_right_wrist= 0;

function preload() {
    song1= loadSound("music.mp3")
    song2= loadSound("music2.mp3");
}

function setup(){
    canvas= createCanvas(500, 500);
    canvas.center()

    video= createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video, modelloaded);
    poseNet.on("pose", gotposes);
}

function modelloaded(){
    console.log("modelloaded!");
}

function gotposes(results){
    if (results.length > 0) {
        console.log(results);

        score_left_wrist= results[0].pose.keypoints[9].score;
        score_right_wrist= results[0].pose.keypoints[10].score;

        left_wrist_x= results[0].pose.leftWrist.x;
        left_wrist_y= results[0].pose.leftWrist.y;

        right_wrist_x= results[0].pose.rightWrist.x;
        right_wrist_y= results[0].pose.rightWrist.y;
    }
}

function draw(){
    image(video, 0, 0, 500, 500);
    song1_status= song1.isPlaying();
    song2_status= song2.isPlaying();
    fill("red");
    stroke("red");

    if (score_left_wrist > 0.2) {
        circle(left_wrist_x, left_wrist_y, 20);
        song2.stop();
        if (song1_status == false) {
            song1.play();
            document.getElementById("h3").innerHTML= "Playing Harry Potter Song";
        }
    }

    if (score_right_wrist > 0.2) {
        circle(right_wrist_x, right_wrist_y, 20);
        song1.stop();
        if (song2_status == false) {
            song2.play();
            document.getElementById("h3").innerHTML= "Playing Peter pan Song";
        }
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);                           
}