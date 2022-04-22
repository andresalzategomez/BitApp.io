const { app, BrowserWindow } = require("electron");

let appWindow;

createWindow = () => {
    appWindow = new BrowserWindow({
        width: 500,
        x: 600,
        y: 0,
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

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});