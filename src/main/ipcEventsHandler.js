'use strict'

import { ipcMain } from 'electron'
import EventsHandler from './eventHandler'
const addIpcEventsHandler = () => {
  let keys = Object.keys(EventsHandler)
  let len = keys.length
  for (var i = 0; i < len; i++) {
    ipcMain.on(keys[i], EventsHandler[keys[i]])
  }
}


export default {
  addIpcEventsHandler
}
