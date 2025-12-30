const Database = require("better-sqlite3");
const { drizzle } = require("drizzle-orm/better-sqlite3");
const path = require("path");
const { app } = require("electron");


const dbPath = path.join(app.getPath("userData"), "magaza.db");
const sqlite = new Database(dbPath);
const db = drizzle(sqlite);


module.exports = {
    sqlite,
    db
}