const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("node:path");
const { getCustomersHandler } = require('./src/handlers/customer/getCustomers.handler');
const { addCustomerHandler } = require('./src/handlers/customer/addCustomer.handler');
const { deleteCustomerHandler } = require('./src/handlers/customer/deleteCustomer.handler');
const { updateCustomerHandler } = require('./src/handlers/customer/updateCustomer.handler');
const { getLogsHandler } = require('./src/handlers/logs/getLogs.handler');
const { sqlite } = require('./src/db/db');

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
ipcMain.handle("update-customer", updateCustomerHandler);
ipcMain.handle("get-logs", getLogsHandler);
sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT,
        credit REAL DEFAULT 0,
        initialDebt REAL DEFAULT 0,
        lastPaymentAmount REAL DEFAULT 0,
        lastPaymentTime TEXT,
        specialInfo TEXT,
        startingDate TEXT,
        dateAdded TEXT,
        isActive INTEGER DEFAULT 1
    )
`);

sqlite.exec(`
    CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerId INTEGER,
        customerName TEXT,
        operation TEXT,
        details TEXT,
        amount REAL,
        timestamp TEXT
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