
const wordList =
  `the sun was shining brightly in the clear blue sky as the birds chirped happily in the
trees lily decided it was a perfect day to go for a walk with her dog max she grabbed his leash and called
out to him come on max let's go for a walk max wagged his tail excitedly and bounded over to her together they set off
down the quiet street the sound of their footsteps echoing softly in the morning air as they walked lily admired the colorful
flowers blooming in the gardens and the cheerful houses with their neatly trimmed lawns they passed by a playground where children
laughed and played their voices filled with joy max paused to sniff at a bush his tail wagging furiously as he caught a whiff of something
interesting lily laughed and tugged gently on his leash urging him to keep moving they walked for what felt like hours exploring every corner
of the neighborhood eventually they reached the park a vast expanse of green grass and towering trees lily unclipped max's leash and watched 
with delight as he bounded off to chase squirrels and butterflies she spread out a blanket under a shady tree and sat down to relax enjoying
the peace and quiet she closed her eyes and listened to the sounds of nature all around her the rustle of leaves the chirping of crickets the
distant hum of traffic it was moments like these that made her feel truly alive she reached into her bag and pulled out a book losing herself
in its pages as she whiled away the hours eventually the sun began to sink lower in the sky casting long shadows across the park lily sighed 
contentedly and packed up her things calling out to max to come back he bounded over to her his tongue lolling happily as he plopped down beside her 
together they made their way back home the fading light of the sun casting a warm glow over everything as they walked lily could help but smile she 
knew that no matter where life took her she would always have max by her side`.split(
    " "
  );
const wordCount = wordList.length;
const button = document.querySelector(".restart");
const field = document.querySelector(".typer");
const toRotate = function () {
  const icon = document.querySelector(".repeat");
  icon.classList.add("click");

  setTimeout(function () {
    icon.classList.remove("click");
  }, 1000);
};

newGame();

function addBackground(element, string, toBeAdded) {
  var allButtons = document.querySelectorAll(string);
  allButtons.forEach(function (item) {
    item.classList.remove(toBeAdded);
  });
  element.classList.add(toBeAdded);
}

function getRandomWords() {
  const randomIndex = Math.ceil(Math.random() * wordCount);
  return wordList[randomIndex - 1];
}

function addClass(elment, name) {
  elment.classList += " " + name;
}

function removeClass(element, name) {
  element.className = element.className.replace(name, "");
}

function formatWords(word) {
  return `<div class="word"><span class="letter">${word
    .split("")
    .join('</span><span class="letter">')}</span></div>`;
}
function newGame() {
  const item = document.querySelector(".typing-content");
  item.innerHTML = "";
  let content = "";
  for (let i = 0; i < 500; i++) {
    content += formatWords(getRandomWords());
  }

  item.innerHTML = content;
  field.value = "";
  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
}

button.addEventListener("click", () =>
  setTimeout(function () {
    toRotate();
    newGame();
  }, 0)
);

function whichClass(element) {
  if (element.classList.contains("correct")) {
    return "correct";
  } else if (element.classList.contains("incorrect")) {
    return "incorrect";
  }
}

field.addEventListener("keyup", function (event) {
  const key = event.key;
  const currentLetter = document.querySelector(".letter.current");
  const currentWord = document.querySelector(".word.current");
  const expected = currentLetter?.innerHTML || " ";
  const isLetter = key.length === 1 && key !== " ";
  const isSpace = key.length === 1 && key === " ";
  const isBack = key === "Backspace";
  const inputField = document.querySelector(".typer");
  const isFirstLetter = currentLetter === currentWord.firstChild;
  const extra = document.createElement("span");
  console.log({ key, expected });
  if (isLetter) {
    if (currentLetter) {
      addClass(currentLetter, key === expected ? "correct" : "incorrect");
      removeClass(currentLetter, "current");
      if (currentLetter.nextSibling) {
        addClass(currentLetter.nextSibling, "current");
      }
    } else {
      extra.innerHTML = key;
      extra.className = "letter incorrect extra";
      currentWord.appendChild(extra);
    }
  }

  if (isSpace) {
    if (expected !== " ") {
      const invalid = [
        ...document.querySelectorAll(".word.current .letter:not(.correct)"),
      ];
      invalid.forEach((letter) => {
        addClass(letter, "incorrect");
      });
      inputField.value = "";
    }
    removeClass(currentWord, "current");
    addClass(currentWord.nextSibling, "current");
    if (currentLetter) {
      removeClass(currentLetter, "current");
    }
    addClass(currentWord.nextSibling.firstChild, "current");
    inputField.value = "";
  }

  if (isBack) {
    if (currentLetter && isFirstLetter) {
      removeClass(currentWord, "current");
      removeClass(currentLetter, "current");
      addClass(currentWord.previousSibling, "current");
      addClass(currentWord.previousSibling.lastChild, "current");
      removeClass(currentWord.previousSibling.lastChild, "correct");
      removeClass(currentWord.previousSibling.lastChild, "incorrect");
      extra = "";
    }

    if (currentLetter && !isFirstLetter) {
      removeClass(currentLetter, "current");
      addClass(currentLetter.previousSibling, "current");
      removeClass(currentLetter.previousSibling, "correct");
      removeClass(currentLetter.previousSibling, "incorrect");
    }

    if (!currentLetter) {
      addClass(currentWord.lastChild, "current");
      removeClass(currentWord.lastChild, "correct");
      removeClass(currentWord.lastChild, "incorrect");
    }
  }

  if (currentWord.getBoundingClientRect().top > 300) {
    const linesContainer = document.getElementById("words");
    const margin = parseInt(words.style.marginTop || "0px");
    linesContainer.style.marginTop = margin - 50 + "px";
  }
});
