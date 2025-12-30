const Response = require("../../utils/Response.class");
const { db } = require("../../db/db");
const { logSchema } = require("../../schema/schema");
const { eq, desc } = require("drizzle-orm");

const getLogsHandler = async (event, customerId) => {
    try {
        let logs;
        if (customerId) {
            logs = await db.select()
                .from(logSchema)
                .where(eq(logSchema.customerId, customerId))
                .orderBy(desc(logSchema.timestamp));
        } else {
            logs = await db.select()
                .from(logSchema)
                .orderBy(desc(logSchema.timestamp))
                .limit(100);
        }
        
        return Response.Success("Loglar uğurla gətirildi", logs);
    } catch (error) {
        console.log(error);
        return Response.Error("Loglar gətirilərkən xəta baş verdi", error.message);
    }
};

module.exports = { getLogsHandler };