const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld('electronAPI', {
    addCustomer: (customerData) => ipcRenderer.invoke('add-customer', customerData),
    getCustomers: () => ipcRenderer.invoke("get-customers"),
    deleteCustomer: (customerId) =>ipcRenderer.invoke("delete-customer",customerId),
    updateCustomer: (customerId,customerData) => ipcRenderer.invoke('update-customer',customerId,customerData)

})