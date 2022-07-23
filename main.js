leftWrist_x = 0;
rightWrist_x = 0;
leftWrist_y = 0;
rightWrist_y = 0;

function preload() {
    song = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelReady);
    posenet.on('pose', gotresult);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("purple");
    if(leftWrist_score > 0.5) {
        circle(leftWrist_x,leftWrist_y,20);
        innumberY = Number(leftWrist_y);
        volume = (floor(innumberY))/500
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "volume: " + volume;

    }

    if (rightWrist_score > 0.5){
        circle(rightWrist_x, rightWrist_y,20);
        if(rightWrist_y>0 && rightWrist_y<100){
            document.getElementById("speed").innerHTML = "speed: 0.5X";
            song.rate(0.5);
        }

        else if(rightWrist_y>100 && rightWrist_y<200) {
            document.getElementById("speed").innerHTML = "speed: 1X";
            song.rate(1);
        }

        else if(rightWrist_y>200 && rightWrist_y<300) {
            document.getElementById("speed").innerHTML = "speed: 1.5X";
            song.rate(1.5);
        }

        else if(rightWrist_y>300 && rightWrist_y<400) {
            document.getElementById("speed").innerHTML = "speed: 2X";
            song.rate(2);
        }

        else if(rightWrist_y>400 && rightWrist_y<500) {
            document.getElementById("speed").innerHTML = "speed: 2.5X";
            song.rate(2.5);
        }

    }
}

function modelReady() {
    console.log("Project Working Nice");
}

function gotresult(result) {
    if (result.length > 0) {
        console.log(result);
        leftWrist_x = result[0].pose.leftWrist.x;
        rightWrist_x = result[0].pose.rightWrist.x;
        leftWrist_y = result[0].pose.leftWrist.y;
        rightWrist_y = result[0].pose.rightWrist.y;
        leftWrist_score = result[0].pose.keypoints[9].score;
        rightWrist_score = result[0].pose.keypoints[10].score;

        // console.log(leftWrist_x + " , " + rightWrist_x + " , " + leftWrist_y + " , " + rightWrist_y);
    }
}

function playsong() {
    song.play();
    song.rate(0.5);
}