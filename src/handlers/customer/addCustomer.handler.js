const Response = require("../../utils/Response.class");
const { db } = require("../../db/db");
const { userSchema } = require("../../schema/schema");
const { createLog } = require("../../utils/logHelper");
const { parseAmount } = require("../../utils/matHelper");

const addCustomerHandler = async (event, data) => {
    try {
        const credit = parseAmount(data.credit);
        const initialDebt = parseAmount(data.initialDebt);
        
        const result = await db.insert(userSchema).values({
            name: data.name,
            phone: data.phone || null,
            credit: credit,
            initialDebt: initialDebt,
            specialInfo: data.specialInfo || null,
            startingDate: data.startingDate || null,
            dateAdded: new Date().toISOString(),
            lastPaymentTime: new Date().toISOString(),
            isActive: 1
        }).returning();

        await createLog(
            result[0].id,
            data.name,
            "ELAVE_EDILDI",
            `Yeni müştəri əlavə edildi. Başlanğıc borc: ${credit.toFixed(2)}₼`,
            credit
        );

        return Response.Success("Müştəri uğurla əlavə edildi", data);
    } catch (error) {
        console.log(error)
        return Response.Error("Müştəri əlavə edilərkən xəta baş verdi", error.message);
    }
};

module.exports = { addCustomerHandler };