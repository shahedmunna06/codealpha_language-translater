const translateButton = document.getElementById("translateButton");

const inputText = document.getElementById("inputText");

const sourceLanguage =
    document.getElementById("sourceLanguage");

const targetLanguage =
    document.getElementById("targetLanguage");

const result =
    document.getElementById("result");

const copyButton =
    document.getElementById("copyButton");

const speakButton =
    document.getElementById("speakButton");


// Translate text
translateButton.addEventListener("click", async function () {

    const text = inputText.value.trim();

    const source = sourceLanguage.value;

    const target = targetLanguage.value;


    if (text === "") {

        alert("Please enter some text.");

        return;
    }


    if (source === target) {

        result.textContent = text;

        return;
    }


    result.textContent = "Translating...";


    try {

        const url =
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;


        const response = await fetch(url);

        const data = await response.json();


        if (data.responseStatus === 200) {

            result.textContent =
                data.responseData.translatedText;

        } else {

            result.textContent =
                "Translation failed. Please try again.";

        }

    } catch (error) {

        console.error(error);

        result.textContent =
            "Something went wrong. Please check your internet connection.";

    }

});


// Copy translation
copyButton.addEventListener("click", function () {

    const translatedText = result.textContent;

    if (
        translatedText !==
        "Your translation will appear here..."
    ) {

        navigator.clipboard.writeText(translatedText);

        alert("Translation copied!");

    }

});


// Text to speech
speakButton.addEventListener("click", function () {

    const text = result.textContent;

    if (
        text ===
        "Your translation will appear here..."
    ) {

        return;
    }


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang = targetLanguage.value;

    window.speechSynthesis.speak(speech);

});