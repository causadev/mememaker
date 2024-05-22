import './style.css'
const topInput = document.querySelector("[data-top-text]")
const bottomInput = document.querySelector("[data-bottom-text]")
const topText = document.querySelector(".topText")
const bottomText = document.querySelector(".bottomText")
let image = document.querySelector("img")
const inputFile = document.querySelector("input")
const downloadBtn = document.querySelector("button")
let baseFontSize = 3
const getTextWidth = (textEl) => textEl.getBoundingClientRect().width



downloadBtn.addEventListener("click", async () => {
  let file = inputFile.files[0];
  
  if (file) {
    
      const imageURL = URL.createObjectURL(file);
      
      async function downloadImage(imageURL) {
          const image = await fetch(imageURL);
          const imageBlob = await image.blob();
          
          const link = document.createElement('a');
          link.href = imageURL;
          link.download = 'meme.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
      
      
      await downloadImage(imageURL);
  }
});




topInput.addEventListener("input", top)
bottomInput.addEventListener("input", bottom)
topInput.addEventListener("keydown", onKeydown)
bottomInput.addEventListener("keydown", onKeydown)
inputFile.addEventListener("change", uploadImage)




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
  }
}
