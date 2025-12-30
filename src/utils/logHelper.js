const { db } = require("../db/db");
const { logSchema } = require("../schema/schema");

async function createLog(customerId, customerName, operation, details, amount = null) {
    try {
        await db.insert(logSchema).values({
            customerId,
            customerName,
            operation,
            details,
            amount,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Log yazılarkən xəta:", error);
    }
}

module.exports = { createLog };