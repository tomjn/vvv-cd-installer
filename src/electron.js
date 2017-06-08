const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const exec = require('promised-exec');
const unzip = require('unzip');
const path = require('path');
const url = require('url');
const Q = require('Q');
const fs = require('fs');
const fstream = require('fstream');

/*var path = require("path");
var absolutePath = path.resolve("vvv.box");
var root = path.dirname(require.main.filename)
console.log( "root: " + root +"\n" +
 "execpath: " + app.execPath +"\n" +
 "getapppath: " + app.getAppPath() +"\n" +
 "getpath exe: " + app.getPath( 'exe' ) );*/



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function getAppRoot() {
  if ( process.platform === 'win32' ) {
    return path.join( app.getAppPath(), '/../../../' );
  }  else {
    return path.join( app.getAppPath(), '/../../../../' );
  }
}
let app_path = getAppRoot();

function sleep(ms) {
  var deferred;

  deferred = Q.defer();

  setTimeout( function() {
    deferred.resolve();
  } , ms );

  return deferred.promise;
}

function create_execution_step_func( mainWindow, index, steps, step ) {
  return function( response ) {
    mainWindow.webContents.send( 'progress', parseInt( ( index+1) / ( steps.length+1 )*100 ) );
    mainWindow.webContents.send( 'progress-message', step.label );
    var command = step.exec;
    command = command.replace( "$NODECWD", app_path );
    return exec( command );
  }
}

function create_unzip_step_func( mainWindow, index, steps, step ) {
  return function( response ) {
    mainWindow.webContents.send( 'progress', parseInt( ( index+1) / ( steps.length+1 )*100 ) );
    mainWindow.webContents.send( 'progress-message', step.label );

    var deferred = Q.defer();
    
    var unzipParser = unzip.Parse();

    unzipParser.on('error', function(err) {
      deferred.reject(new Error("error " + err ));
    });
    unzipParser.on('close', function() {
      deferred.resolve();
    });

    var readStream = fs.createReadStream(step.source);
    var writeStream = fstream.Writer(step.target);
    readStream
      .pipe(unzipParser)
      .pipe(writeStream);

    return deferred.promise;
  }
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    fullscreenable: false,
    title: "VVV CD Edition",
    backgroundColor: '#343d46',
    titleBarStyle: 'hidden',
    center: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }));
  mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('new-window', function(event, url){
    event.preventDefault();
    require('electron').shell.openExternal(url);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });



  var i = 0;

  mainWindow.webContents.send( 'progress', 0 );
  mainWindow.webContents.send( 'progress-message', "Initialising");
  mainWindow.webContents.send( 'app-status', "installing");

  // we need a promise to start off with, not sure this will work on Windows though
  var promise = sleep(1000);//exec( "sleep 1" );
  var steps = require( './steps-'+process.platform );

  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];
    if ( 'exec' == step.type ) {
      promise = promise.then( create_execution_step_func(mainWindow, i, steps, step ) );
    } else if ( 'unzip' == step.type ) {
      // if the file to test for exists then we don't need to unzip
      if ( ! fs.existsSync( step.test ) ) {
        if ( fs.existsSync( step.source ) ) {
          promise = promise.then( create_unzip_step_func(mainWindow, i, steps, step ) );
        } else {
          console.log( "Archive to be extracted '"+step.source +"' does not exist, skipping " );
        }
      } else { 
        console.log( 'Test file already exists' );
      }
    }
  }
  promise = promise.then( function() {
    mainWindow.webContents.send( 'progress', 100 );
    mainWindow.webContents.send( 'progress-message', "Complete");
    mainWindow.webContents.send( 'app-status', "success");
  }).fail( function(errorObject) {
    console.log( errorObject );
    mainWindow.webContents.send( 'app-status', "problem");
    mainWindow.webContents.send( 'progress-error', "Error! " + errorObject.string);
  }).done();

  setTimeout( function () {
    var message =  "approot: " + app_path;
    mainWindow.webContents.send( 'log', message );
  }, 1000);
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
