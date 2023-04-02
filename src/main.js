// DOM
const startBtn = document.querySelector("#start");
const language = document.querySelector("#endregionlanguage-select");
const dialect = document.querySelector("#dialect-select");
const final = document.querySelector("#final-result");
const interim = document.querySelector("#interim-result");

// Variables
const recognition = new webkitSpeechRecognition();
let started = false;

// Setup
recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = true;
recognition.lang = dialect.value;

// Events
recognition.onresult = (event) => {
    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
        } else {
            interimTranscript += event.results[i][0].transcript;
        }
    }

    final.innerText = finalTranscript;
    interim.innerText = interimTranscript;
};
recognition.onaudioend = () => {
    if (!started) return;
    handleSpeachRecogtiniton();
}
dialect.addEventListener('change', () => changeLang(dialect.value));

// Functions
function changeLang(dialect) {
    recognition.lang = dialect;
}

function handleSpeachRecogtiniton() {
    if (!started) {
        started = true
        recognition.start();
        startBtn.className = "bg-red-500 hover:bg-red-700 transition ease duration-300 p-2 rounded-md px-12"
        startBtn.innerText = "Stop";
    } else {
        started = false
        recognition.stop();
        startBtn.className = "bg-green-500 hover:bg-green-700 transition ease duration-300 p-2 rounded-md px-12"
        startBtn.innerText = "Start";
    } 
}