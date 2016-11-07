const {app, BrowserWindow} = require('electron')
const fireconf = require('./config.json')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
var initialState

function moveToIndex (state) {
  initialState = state
  initialState.selected = 0
  initialState.Resumen = {hola:'mundo'}
  console.log(initialState)
  let oldWin
  if(win) {
    oldWin = win    
  }
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL(`file://${__dirname}/view/index.html`)
  win.webContents.openDevTools()
  win.setMenu(null)
  if(oldWin) {
    oldWin.close()
  }
  win.on('closed', () => {win = null})
}


splashScreen = () => {
   win = new BrowserWindow({width: 400, height: 400, frame:false})
   win.loadURL(`file://${__dirname}/view/splash.html`)
   //win.webContents.openDevTools()
   win.setMenu(null)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', splashScreen)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    splashScreen()
  }
})

module.exports = {
  fireconf: fireconf,
  moveToIndex: moveToIndex,
  getState: ()=>(initialState)
}
