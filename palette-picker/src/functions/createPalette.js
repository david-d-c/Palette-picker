import { createColorOption } from "./createColorOption";
import { removePaletteFromLocalStorage } from "./local-storage-helpers/palettesLocalStorage";

export const createPalette = ({ colors, title, temp, uuid }) => {

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