const Response = require("../utils/Response.class");
const { db } = require("../db/db");
const { userSchema } = require("../schema/schema");

const getCustomersHandler = async () => {
    try {
        const customers = await db.select().from(userSchema);
        
        return Response.Success("Müştərilər uğurla gətirildi", customers);
    } catch (error) {
        return Response.Error("Müştərilər gətirilərkən xəta baş verdi", error.message);
    }
};

module.exports = { getCustomersHandler };