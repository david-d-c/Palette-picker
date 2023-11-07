import { copyButtonHandler } from "./event-handlers/eventHandlers"

export const createColorOption = (color) => {
    const option = document.createElement('div')
    option.className = 'option'
  
    const copyButton = document.createElement('button')
    copyButton.innerHTML = `Copy <br>${color}`
    copyButton.className = 'copyButton'
    copyButton.dataset.colorCode = color
    copyButton.addEventListener('click', copyButtonHandler)
  
    const exampleBackground = document.createElement('div')
    exampleBackground.className = 'exampleBackground'
  
    const whiteBox = document.createElement('div')
    whiteBox.className = 'whiteBox'
  
  
    const blackBox = document.createElement('div')
    blackBox.className = 'blackBox'
  
    const color1 = document.createElement('p')
    color1.className = 'newColor'
    color1.style.backgroundColor = color
    color1.innerHTML = `Text <span>Example</span>`
  
  
    exampleBackground.append(whiteBox, color1, blackBox)
    option.append(exampleBackground, copyButton)
  
    return option
  }