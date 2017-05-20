const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const exec = require('promised-exec');

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function create_execution_step_func( mainWindow, index, steps, step ) {
  return function( response ) {
    mainWindow.webContents.send( 'progress', parseInt( ( index+1) / ( steps.length+1 )*100 ) );
    mainWindow.webContents.send( 'progress-message', step.label );
    return exec( step.exec );
  }
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
    {
      'label': 'Mounting Git disk',
      'exec': "if ! hash git 2>/dev/null; then hdiutil attach MacOS/git.dmg; fi"
    },
    {
      'label': 'Installing Git',
      'exec': 'sleep 1'
    },
    {
      'label': 'Mounting VirtualBox disk',
      'exec': "if ! hash vbox-img 2>/dev/null; then hdiutil attach MacOS/virtualbox.dmg; fi"
    },
    {
      'label': 'Installing VirtualBox',
      'exec': 'sleep 1'
    },
    {
      'label': 'Mounting Vagrant disk',
      'exec': "if ! hash vagrant 2>/dev/null; then hdiutil attach MacOS/vagrant.dmg; fi"
    },
    {
      'label': 'Installing Vagrant',
      'exec': 'sleep 1'
    },
    {
      'label': 'Installing Vagrant Hosts Updater Plugin',
      'exec': 'vagrant plugin install vagrant-hostsupdater'
    },
    {
      'label': 'Installing Vagrant Triggers Plugin',
      'exec': 'vagrant plugin install vagrant-triggers'
    },
    {
      'label': 'Extracting VVV archive',
      'exec': 'sleep 1'
    },
    {
      'label': 'Adding VVV Box',
      'exec': 'sleep 1'
    },
    {
      'label': 'Starting VVV for the first time',
      'exec': 'vagrant up'
    }
  ];

  mainWindow.webContents.send( 'progress', 0 );
  mainWindow.webContents.send( 'progress-message', "Initialising");

  var promise = exec( "sleep 1" );

  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];
    promise = promise.then( create_execution_step_func(mainWindow, i, steps, step ) )
  }
  promise = promise.then( function() {
    mainWindow.webContents.send( 'progress', 100 );
    mainWindow.webContents.send( 'progress-message', "Complete");
  }).fail( function(errorObject) {
    mainWindow.webContents.send( 'progress-message', "Error! " + errorObject.string);
  }).done();
  

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
  //if (process.platform !== 'darwin') {
    app.quit()
  //}
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
