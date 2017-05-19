const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }))
  var i = 0;
  var steps = [
    'Initialising',
    'Installing Git',
    'Installing VirtualBox',
    'Installing Vagrant',
    'Installing Vagrant Plugins',
    'Copying VVV',
    'Adding VVV Box',
    'Starting VVV for the first time'
  ];

  mainWindow.webContents.send( 'progress', 0 );
  mainWindow.webContents.send( 'progress-message', "Initialising");
  sleep( 3000 ).then( stuff );
  

  function stuff() {
    if ( i < steps.length ) {
      i++;
      console.log( 'i is: ' + i )
      mainWindow.webContents.send( 'progress', parseInt( (i/steps.length)*100 ) );
      mainWindow.webContents.send( 'progress-message', steps[i]);
    }
    if ( i < steps.length ) {
      sleep( 3000 ).then( stuff );
    } else {
      mainWindow.webContents.send( 'progress', 100 );
      mainWindow.webContents.send( 'progress-message', 'Finished' );
    }
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
