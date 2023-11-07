import './style.css'
import { onLoadHandler, formHandler } from './functions/event-handlers/eventHandlers'

window.addEventListener('load', onLoadHandler)
document.querySelector('form').addEventListener('submit', formHandler)