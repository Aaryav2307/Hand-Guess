prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});

camera = document.getElementById("camera");

Webcam.attach('#camera')

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';

    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xm-XRMFGI/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first guess is " + prediction_1;
    speak_data_2 = "The second guess is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1, speak_data_2);
    synth.speak(utterThis);
}

function predict_hand() {

    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {

        console.error(error);

    } else {

        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("result_hand_name").innerHTML = prediction_1;
        document.getElementById("result_hand_name2").innerHTML = prediction_2;

        speak();
        if (prediction_1 == "Ok") {
            document.getElementById("result_hand").innerHTML = "&#128076;";
        }

        if (prediction_1 == "Peace") {
            document.getElementById("result_hand").innerHTML = "&#9996;";
        }

        if (prediction_1 == "Great") {
            document.getElementById("result_hand").innerHTML = "&#128077;";
        }

        if (prediction_2 == "Ok") {
            document.getElementById("result_hand2").innerHTML = "&#128170;";
        }

        if (prediction_2 == "Peace") {
            document.getElementById("result_hand2").innerHTML = "&#129311;";
        }

        if (prediction_2 == "Great") {
            document.getElementById("result_hand2").innerHTML = "&#128074;";
        }
    }
}