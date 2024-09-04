
const topInput = document.querySelector("[data-top-text]")
const bottomInput = document.querySelector("[data-bottom-text]")
const topText = document.querySelector(".topText")
const bottomText = document.querySelector(".bottomText")
let image = document.querySelector("img")
const inputFile = document.querySelector("input")
const downloadBtn = document.querySelector("button")
let baseFontSize = 3
const genMeme = document.querySelector("#genMeme")
const getTextWidth = (textEl) => textEl.getBoundingClientRect().width





topInput.addEventListener("input", top)
bottomInput.addEventListener("input", bottom)
topInput.addEventListener("keydown", onKeydown)
bottomInput.addEventListener("keydown", onKeydown)
inputFile.addEventListener("change", uploadImage)

function clearText(e) {
  topText.textContent = ""
  bottomText.textContent = ""
  topInput.textContent = ""
  bottomInput.textContent = ""
}




function top(e) {
  topText.textContent = e.target.textContent

  shrinkText(topText)

}

function bottom(e) {
  bottomText.textContent = e.target.textContent
  shrinkText(bottomText)
}

function shrinkText(textEl) {
  const { width: imageWidth } = image.getBoundingClientRect()
  let textWidth = getTextWidth(textEl)

 

  while (textWidth >= imageWidth) {
    baseFontSize = baseFontSize - 0.01
    textEl.style.fontSize = `${baseFontSize}rem`
    textWidth = getTextWidth(textEl)
  }
}



function growText(textEl) {
  const { width: imageWidth } = image.getBoundingClientRect()
  let textWidth = getTextWidth(textEl)

  if (baseFontSize >= 3) return



  
  
  


  while (textWidth <= imageWidth) {
    baseFontSize = baseFontSize + 0.02
    textEl.style.fontSize = `${baseFontSize}rem`
    textWidth = getTextWidth(textEl)
  }
}


function onKeydown(e) {
  if (e.key !== "Backspace" && e.key !== "x" && e.key !== "Control") return
  
  if (e.target.matches("[data-top-text]")) {
    growText(topText)
  }
  if (e.target.matches("[data-bottom-text]")) {
    growText(bottomText)
  }
}


function uploadImage() {
  const file = inputFile.files[0]
  if (file) {
    image.src = URL.createObjectURL(file)
    const reader = new FileReader()

    reader.onload = (() => {
      const base64string = reader.result
      sessionStorage.setItem("Image", base64string)
    })

    reader.readAsDataURL(file)

    clearText()
  }
}




downloadBtn.addEventListener("click", () => {
  html2canvas(document.querySelector("#screenshot"), { backgroundColor: null, imageTimeout: 0, logging: false }).then(canvas => {
    canvas.toBlob(blob => {
      saveAs(blob, 'meme.png');
    });
  });
});

function getRandomInt() {
  return Math.floor(Math.random() * 99);
}

let memes

genMeme.addEventListener("click", () => {
  const randomI = getRandomInt()
  if (!memes) {
    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(response => {
      memes = response.data.memes
      loadImage(randomI)
      sessionStorage.setItem("ImageApi", memes[randomI].url)

    })
    .catch(error => console.error(error));
  }

  else if (memes) {
    loadImage(randomI)
  }
});



function loadImage(index) {
  image.src = memes[index].url
  clearText()
}


window.onload = (() => {
  const storedImage = sessionStorage.getItem("Image")
  const storedImageApi = sessionStorage.getItem("ImageApi")
  if (storedImage) {
    image.src = storedImage
  } else if (storedImageApi) {
    image.src = storedImageApi
  }
})

