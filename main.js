const { app, BrowserWindow } = require("electron");
var Positioner = require('electron-positioner');
var positioner = new Positioner(BrowserWindow);

let appWindow;

createWindow = () => {
    appWindow = new BrowserWindow({
        width: 500,
        
        height: 600,
        title: "BitApp",
        resizable: false,
        
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    
    appWindow.loadURL(`file://${__dirname}/dist/index.html`);

    appWindow.setMenu(null);

    appWindow.webContents.openDevTools();

    appWindow.on("closed", () => {
        appWindow = null;
    });
}


app.on("ready", createWindow, () =>{positioner.move('rightCenter')});


app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});