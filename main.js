const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("node:path");
const { getCustomersHandler } = require('./handlers/getCustomers.handler');
const { addCustomerHandler } = require('./handlers/addCustomer.handler');
const { deleteCustomerHandler } = require('./handlers/deleteCustomer.handler');
const { updateCustomerHandler } = require('./handlers/updateCustomer.handler');
const { sqlite } = require('./db/db');
const createWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "./config/preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    })
    win.maximize()
    win.show()
    win.loadFile('./public/index.html')
}

ipcMain.handle("get-customers", getCustomersHandler);
ipcMain.handle("add-customer", addCustomerHandler);
ipcMain.handle("delete-customer", deleteCustomerHandler);
ipcMain.handle("update-customer", updateCustomerHandler)
sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT,
        credit INTEGER DEFAULT 0,
        initialDebt INTEGER DEFAULT 0,
        lastPaymentAmount TEXT,
        lastPaymentTime TEXT,
        specialInfo TEXT,
        startingDate TEXT,
        dateAdded TEXT,
        goods TEXT,
        isActive INTEGER DEFAULT 1
    )
`);

app.whenReady().then(() => {

    createWindow();
})
app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})