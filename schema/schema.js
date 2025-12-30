const { sqliteTable, integer, text } = require("drizzle-orm/sqlite-core");

const userSchema = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    phone: text("phone"),
    credit: integer("credit"),
    initialDebt: integer("initialDebt"),
    lastPaymentAmount: text("lastPaymentAmount").default(0),
    lastPaymentTime: text("lastPaymentTime"),
    specialInfo: text("specialInfo"),
    startingDate: text("startingDate"),
    dateAdded: text("dateAdded"),
    isActive: integer("isActive").default(1),
})


module.exports = {userSchema}