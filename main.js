import './style.css'
const topInput = document.querySelector("[data-top-text]")
const bottomInput = document.querySelector("[data-bottom-text]")
const topText = document.querySelector(".topText")
const bottomText = document.querySelector(".bottomText")

topInput.addEventListener("input", top)

bottomInput.addEventListener("input", bottom)


function top(e) {
  topText.textContent = e.target.textContent
}

function bottom(e) {
  bottomText.textContent = e.target.textContent
}


console.log("Hola!")
