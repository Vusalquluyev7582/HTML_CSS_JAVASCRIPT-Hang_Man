const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_el = document.getElementById("success-message");
const wrongLetters_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message = document.getElementById("message");
const playAgainBtn = document.getElementById("play-again")

const correctLetters = []
const wrongLetters = [];
let selectorWord = getRandomWord();

function getRandomWord() {
    const words = ["html", "css", "bootstrap", "javascript", "react"];

    return words[Math.floor(Math.random() * words.length)]
}

// console.log(getRandomWord());

function displayWord() {

    word_el.innerHTML = `
     
    ${selectorWord.split("").map(letter => `
    
    <div class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </div>
    `).join("")}

    `;

    // console.log(word_el.innerText.replace(/\n/g,""));

    const w = word_el.innerText.replace(/\n/g, "");
    if (w === selectorWord) {
        // console.log("Bildiniz");

        popup.style.display = "flex";
        message_el.innerText = "Təbriklər Qazandınız";
    }
}

function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
    ${wrongLetters.length > 0 ? `<h3>Yalnış hərflər</h3>` : ``}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if (index < errorCount) {
            item.style.display = "block"
        }
        else {
            item.style.display = "none"
        }
    })

    if (wrongLetters.length === items.length) {
        popup.style.display = "flex";
        message_el.innerText = "Təəssüf ki Uduzdunuz";
    }
}

function displayMessage() {
    message.classList.add("show");
    setTimeout(function () {
        message.classList.remove("show")
    }, 2000)
}

playAgainBtn.addEventListener("click", function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectorWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = "none"
})

window.addEventListener("keydown", function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        // console.log(e.key);
        // console.log(e.keyCode);

        const letter = e.key;

        if (selectorWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord()
            }
            else {
                // console.log("Bu hərfi zatən yazmısız");
                displayMessage()
            }
        }
        else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter)
                // console.log("Yalnış hərfləri güncəllə");

                updateWrongLetters()
            }
            else {
                displayMessage()
            }
        }
    }
})
displayWord()