import './style.css'
import { v4 as uuidv4 } from 'uuid'
import palettes from '/palettes.json'

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getLocalStorageValue = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  }
  catch (err) {
    console.error(err)
    return null
  }
}
const getPalettes = () => getLocalStorageValue('palettes') || []

const setPalettes = (newPalettes) => setLocalStorageKey('palettes', newPalettes)

const initPalettesIfEmpty = () => {
  if (!getPalettes().length) setPalettes(palettes)
}
const addPaletteToLocalStorage = (palette) => {
  setPalettes([palette, ...getLocalStorageValue('palettes')])
}
const removePaletteFromLocalStorage = (paletteUuid) => {
  setPalettes(getPalettes().filter(({ uuid }) => uuid !== paletteUuid))
}

const createColorOption = (color) => {
  const option = document.createElement('div')
  option.className = 'option'

  const copyButton = document.createElement('button')
  copyButton.innerHTML = `Copy <br>${color}`
  copyButton.className = 'copyButton'
  copyButton.dataset.colorCode = color

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

const createPalette = ({ colors, title, temp, uuid }) => {

  const newPalette = document.createElement('div')
  newPalette.className = 'newPalette'

  const paletteTitle = document.createElement('h3')
  paletteTitle.textContent = title

  const paletteTemp = document.createElement('p')
  paletteTemp.textContent = temp
  paletteTemp.className = 'paletteTemp'
  switch (temp) {
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
  deleteButton.onclick = function () {
    removePaletteFromLocalStorage(uuid)
    newPalette.remove()
  }

  const option1 = createColorOption(colors[0])
  const option2 = createColorOption(colors[1])
  const option3 = createColorOption(colors[2])

  newPalette.append(paletteTitle, option1, option2, option3, deleteButton, paletteTemp)
  document.getElementById('palettes').append(newPalette)
}

window.addEventListener('load', (e) => {
  initPalettesIfEmpty()
  getPalettes().forEach((obj) => {
    createPalette(obj)
  });
})


document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const { title, color1, color2, color3, temp } = Object.fromEntries(formData);
  const newPaletteObj = {
    title,
    temp,
    colors: [color1, color2, color3],
    uuid: uuidv4()
  };
  console.log(newPaletteObj)
  addPaletteToLocalStorage(newPaletteObj)
  createPalette(newPaletteObj)

  document.querySelector('form').reset()
})

document.querySelectorAll('.copyButton').forEach(item => {
  item.addEventListener('click', async event => {
    if (!navigator.clipboard) {
      // Clipboard API is not available
      return;
    }
    try {
      await navigator.clipboard.writeText(event.target.dataset.colorCode);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  });
});