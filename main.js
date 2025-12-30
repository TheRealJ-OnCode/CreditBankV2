const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("node:path");
const { getCustomersHandler } = require('./handlers/getCustomers.handler');
const { addCustomerHandler } = require('./handlers/addCustomer.handler');
const { deleteCustomerHandler } = require('./handlers/deleteCustomer.handler');
const { updateCustomerHandler } = require('./handlers/updateCustomer.handler');

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

ipcMain.handle("get-customers",getCustomersHandler);
ipcMain.handle("add-customer",addCustomerHandler);
ipcMain.handle("delete-customer",deleteCustomerHandler);
ipcMain.handle("update-customer",updateCustomerHandler)


app.whenReady().then(() => {

    createWindow();
})
app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})