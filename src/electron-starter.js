const electron = require('electron')
const {autoUpdater} = require('electron-updater')

// Module to control application life
const app = electron.app

// Module to create native browser window
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object
// If you don't, the window will be closed automatically
// when the Javascript object is garbage collected.
let  mainWindow

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        backgroundColor: '#141517',
        icon: path.join(__dirname, './assets/icon.png')
    })

    const startUrl = process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, './../build/index.html'),
            protocol: 'file:',
            slashes: true
        })
    // and load the index.html of the app
    mainWindow.loadURL(startUrl)

    // Open the devtools
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed
    mainWindow.on('closed', function () {
        // Dereference the window object
        // usually you would store windows in an array
        // If your app suuports multi windows,
        // this is the time
        // when you should delete the corresponding element
        mainWindow = null
    })
}

// This method will be called
// when Electron has finished initialization
// and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed
app.on('window-all-closed', function () {
    // On OS X, it is common for applications
    // and their menu bar tostay active
    // until the user quits explicitly with cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X, it is common to re-create a window in the app
    // when the dock icon is clicked
    // and there are no other window open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file,
// you can include the rest of your app's specific main process code.
// You can also put them in separate files and require them here.

//
// Auto Updates
//
const sendStatusToWindow = (text) => {
    if (mainWindow) {
        mainWindow.webContents.send('message', text)
    }
}

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...')
})

autoUpdater.on('update-available', info => {
    sendStatusToWindow('Update available')
})

autoUpdater.on('update-not-available', info => {
    sendStatusToWindow('Update not available')
})

autoUpdater.on('error', err => {
    sendStatusToWindow(`Error in auto-updater: ${err.toString()}`)
})

autoUpdater.on('download-progress', progressObj => {
    sendStatusToWindow(
        `Download speed: ${progressObj.bytesPerSecond} ` +
        `- Downloaded ${progressObj.percent}% ` +
        `${progressObj.transferred}`
    )
})

autoUpdater.on('update-downloaded', info => {
    sendStatusToWindow('Update downloaded; will install now')
    autoUpdater.quitAndInstall()
})
