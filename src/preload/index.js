import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  save : (data) =>  ipcRenderer.invoke('save', data),
  cariUser : (usn, pass) => ipcRenderer.invoke('cariUser', usn, pass),
  loadUser : () => ipcRenderer.invoke('loadUser'),
  loadProgram: () => ipcRenderer.invoke('loadProgram'),
  saveProgram : (data) => ipcRenderer.invoke('saveProgram', data)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.api = api
}
