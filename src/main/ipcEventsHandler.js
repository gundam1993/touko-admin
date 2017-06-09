'use strict'

import { ipcMain } from 'electron'
import EventsHandler from './eventHandler'
const addIpcEventsHandler = () => {
  ipcMain.on('login', EventsHandler.login)
  ipcMain.on('getPosts', EventsHandler.getPosts)
}

export default {
  addIpcEventsHandler
}
