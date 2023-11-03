import './style.css'
import { v4 as uuidv4 } from 'uuid'
import palettes from '/palettes.json'

console.log(palettes)
//localStorage.clear()
localStorage.setItem('palettes', JSON.stringify(palettes))
console.log(localStorage)

const createColorOption = (color) => {
  const option = document.createElement('div')
  option.className = 'option'

  const copyButton = document.createElement('button')
  copyButton.textContent = `Copy ${color}`
  copyButton.className = 'copyButton'

  const exampleBackground = document.createElement('div')
  exampleBackground.style.width = '60%'

  const whiteBox = document.createElement('div')
  whiteBox.style.backgroundColor = 'white'
  whiteBox.style.height = "30px";
  whiteBox.style.marginBottom = '-10px'
  

  const blackBox = document.createElement('div')
  blackBox.style.backgroundColor = 'black'
  blackBox.style.height = '30px'
  blackBox.style.marginTop = '-10px'
  
  const color1 = document.createElement('p')
  color1.style.backgroundColor = color
  color1.innerHTML = `Text <span>Example</span>`
  color1.style.display = 'inline'
  color1.style.padding = '10px'
  color1.querySelector('span').style.color = 'black'

  exampleBackground.append(whiteBox, color1, blackBox)
  option.append(exampleBackground, copyButton)

  return option
}

const createPalette = (colors, title, temp) => {


  const newPalette = document.createElement('div')
  newPalette.style.width = '25%'
  newPalette.style.textAlign = 'center'
  newPalette.style.border = '1px solid white'
  newPalette.style.backgroundColor = '#333'
  newPalette.style.margin = '0 2.5%'
  

  const paletteTitle = document.createElement('h3')
  paletteTitle.textContent = title

  const paletteTemp = document.createElement('p')
  paletteTemp.textContent = temp
  paletteTemp.style.margin = 'auto'
  paletteTemp.style.padding = '10px'
  switch(temp){
    case 'neutral':
      paletteTemp.style.backgroundColor = '#555';
      break;
    case 'cool':
      paletteTemp.style.backgroundColor = '#121e43';
      break;
    case 'warm':
      paletteTemp.style.backgroundColor = '#431212';
      break;
  }

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete Palette'

  const option1 = createColorOption(colors[0])
  const option2 = createColorOption(colors[1])
  const option3 = createColorOption(colors[2])
 
  newPalette.append(paletteTitle, option1, option2, option3, deleteButton, paletteTemp)
  document.getElementById('palettes').append(newPalette)
}





document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const { title, color1, color2, color3, temp } = Object.fromEntries(formData);

  createPalette([color1, color2, color3],title, temp)

  document.querySelector('form').reset()
})