import { setLocalStorageKey } from './setLocalStorageKey'
import { getLocalStorageValue } from './getLocalStorageValue'
import palettes from '/palettes.json'

export const getPalettes = () => getLocalStorageValue('palettes') || []

export const setPalettes = (newPalettes) => setLocalStorageKey('palettes', newPalettes)

export const initPalettesIfEmpty = () => {
  if (!getPalettes().length) setPalettes(palettes)
}
export const addPaletteToLocalStorage = (palette) => {
  setPalettes([palette, ...getLocalStorageValue('palettes')])
}
export const removePaletteFromLocalStorage = (paletteUuid) => {
  setPalettes(getPalettes().filter(({ uuid }) => uuid !== paletteUuid))
}


