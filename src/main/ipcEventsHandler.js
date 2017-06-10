'use strict'

import { ipcMain } from 'electron'
import EventsHandler from './eventHandler'
const addIpcEventsHandler = () => {
  ipcMain.on('login', EventsHandler.login)
  ipcMain.on('getPosts', EventsHandler.getPosts)
  ipcMain.on('deletePosts', EventsHandler.deletePosts)
  ipcMain.on('moveToDraftbox', EventsHandler.moveToDraftbox)
  ipcMain.on('publishPost', EventsHandler.publishPost)
  ipcMain.on('getPostById', EventsHandler.getPostById)
}

export default {
  addIpcEventsHandler
}
