'use strict'

import { ipcMain } from 'electron'
import EventsHandler from './eventHandler'
const addIpcEventsHandler = () => {
  ipcMain.on('login', EventsHandler.loginHandler)
}

export default {
  addIpcEventsHandler
}
