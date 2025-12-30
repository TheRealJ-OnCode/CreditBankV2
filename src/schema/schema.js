const { sqliteTable, integer, text } = require("drizzle-orm/sqlite-core");

const userSchema = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    phone: text("phone"),
    credit: integer("credit"),
    initialDebt: integer("initialDebt"),
    lastPaymentAmount: integer("lastPaymentAmount").default(0),
    lastPaymentTime: text("lastPaymentTime"),
    specialInfo: text("specialInfo"),
    startingDate: text("startingDate"),
    dateAdded: text("dateAdded"),
    isActive: integer("isActive").default(1),
})

const logSchema = sqliteTable("logs", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    customerId: integer("customerId"),
    customerName: text("customerName"),
    operation: text("operation"),
    details: text("details"),
    amount: integer("amount"),
    timestamp: text("timestamp")
})

module.exports = { userSchema, logSchema }