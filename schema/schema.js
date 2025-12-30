const { sqliteTable, integer, text } = require("drizzle-orm/sqlite-core");

const userSchema = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    surname: text("surname"),
    phone: text("phone"),
    credit: text("credit"),
    initialDebt: text("initialDebt"),
    lastPaymentAmount: text("lastPaymentAmount"),
    lastPaymentTime: text("lastPaymentTime"),
    specialInfo: text("specialInfo"),
    startingDate: text("startingDate"),
    dateAdded: text("dateAdded"),
    goods: text("goods"),
    isActive: integer("isActive").default(1),
})


const logSchema = sqliteTable("logs", {
    id: text("id"),
    name: text("name"),
    surname: text("surname"),
    log: text("log"),
    date: text("date"),
    operation: text("operation")

})


module.exports = {userSchema,logSchema}