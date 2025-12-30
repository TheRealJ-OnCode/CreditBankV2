const { sqliteTable, integer, text, real } = require("drizzle-orm/sqlite-core");

const userSchema = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    phone: text("phone"),
    credit: real("credit").default(0),
    initialDebt: real("initialDebt").default(0),
    lastPaymentAmount: real("lastPaymentAmount").default(0),
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
    amount: real("amount"),
    timestamp: text("timestamp")
})

module.exports = { userSchema, logSchema }