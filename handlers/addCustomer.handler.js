const Response = require("../utils/Response.class");
const { db } = require("../db/db");
const { userSchema } = require("../schema/schema");

const addCustomerHandler = async (event, data) => {
    try {
        await db.insert(userSchema).values({
            name: data.name,
            phone: data.phone || null,
            credit: data.credit,
            initialDebt: data.initialDebt,
            specialInfo: data.specialInfo || null,
            startingDate: data.startingDate || null,
            dateAdded: new Date().toISOString(),
            lastPaymentTime: new Date().toISOString(),
            isActive: 1
        });

        return Response.Success("Müştəri uğurla əlavə edildi", data);
    } catch (error) {
        console.log(error)
        return Response.Error("Müştəri əlavə edilərkən xəta baş verdi", error.message);
    }
};

module.exports = { addCustomerHandler };