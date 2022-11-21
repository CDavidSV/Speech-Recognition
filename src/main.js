// Document.
speechText = document.querySelector('#interim-text');

// Variables.
const recognition = new webkitSpeechRecognition();
let finalTranscript;
let interimTranscript;

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'es-ES'

recognition.onresult = event => {
    interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
        } else {
            interimTranscript += event.results[i][0].transcript;
        }
    }
}

speechText.textContent = interimTranscript;

recognition.start();