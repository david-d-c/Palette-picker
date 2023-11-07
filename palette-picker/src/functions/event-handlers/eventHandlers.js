import { createPalette } from '../createPalette';
import { v4 as uuidv4 } from 'uuid'
import { getPalettes, initPalettesIfEmpty, addPaletteToLocalStorage } from "../local-storage-helpers/palettesLocalStorage";

export const copyButtonHandler = async event => {
    if (!navigator.clipboard) {
      // Clipboard API is not available
      return;
    }
    try {
      await navigator.clipboard.writeText(event.target.dataset.colorCode);
      event.target.innerHTML = `Copied <br>Hex!`
      setTimeout(() => {
        event.target.innerHTML = `Copy <br>${event.target.dataset.colorCode}`
      }, 1000)
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

export const onLoadHandler = () => {
    initPalettesIfEmpty()
    getPalettes().forEach((obj) => {
      createPalette(obj)
    });
  }

export const formHandler = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { title, color1, color2, color3, temp } = Object.fromEntries(formData);
    const newPaletteObj = {
      title,
      temp,
      colors: [color1, color2, color3],
      uuid: uuidv4()
    };

    addPaletteToLocalStorage(newPaletteObj)
    createPalette(newPaletteObj)
  
    document.querySelector('form').reset()
  }