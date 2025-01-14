// Enhanced JARVIS JavaScript Code
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Function to use text-to-speech
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

// Function to greet based on the time of day
function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

// Initialize JARVIS on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        speak("Initializing JARVIS.. Please wait.");
        wishMe();
    }, 1000); // Delayed initialization
});

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = false; // Focus on final results only for clarity
recognition.maxAlternatives = 3; // Consider multiple alternatives for better recognition
recognition.lang = 'en-US'; // Set language
recognition.continuous = false; // Stop automatically after speech is detected

recognition.onstart = () => {
    console.log("Voice recognition started");
    content.textContent = "Listening...";
};

recognition.onspeechend = () => {
    console.log("Speech ended");
    recognition.stop();
    content.textContent = "Processing...";
};

recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
    speak("Sorry, I couldn't hear you clearly. Please try again.");
    content.textContent = "Error occurred. Try again.";
};

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    console.log("Recognized Speech:", transcript);
    content.textContent = transcript;

    // Confidence Check
    const confidence = event.results[currentIndex][0].confidence;
    console.log("Recognition Confidence:", confidence);

    if (confidence > 0.6) { // Ensure higher confidence before execution
        takeCommand(transcript.toLowerCase());
    } else {
        speak("I didn't catch that clearly. Could you repeat?");
        content.textContent = "Low confidence in recognition. Please try again.";
    }
};

// Start voice recognition on button click
btn.addEventListener('click', () => {
    console.log("Listening...");
    content.textContent = "Listening...";
    recognition.start();
});

// Command processing function
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How may I assist you?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        const query = message.replace(/ /g, "+");
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
        const query = message.replace("wikipedia", "").trim();
        window.open(`https://en.wikipedia.org/wiki/${query}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + query);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleDateString();
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        speak("I can't open the calculator directly, but you can use one on your device.");
    } else {
        const searchQuery = message.replace(/ /g, "+");
        speak("I found some information for " + message + " on Google.");
        setTimeout(() => {
            window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
        }, 500);
    }
}

// Debugging utility
console.log("JARVIS script loaded successfully.");
