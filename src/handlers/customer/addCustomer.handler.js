const Response = require("../../utils/Response.class");
const { db } = require("../../db/db");
const { userSchema } = require("../../schema/schema");
const { createLog } = require("../../utils/logHelper");
const { parseMoneyInput } = require("../../utils/matHelper");

const addCustomerHandler = async (event, data) => {
    try {
        const credit = parseMoneyInput(data.credit);
        const initialDebt = parseMoneyInput(data.initialDebt);
        
        const result = await db.insert(userSchema).values({
            name: data.name,
            phone: data.phone || null,
            credit: Math.round(credit * 100),
            initialDebt: Math.round(initialDebt * 100),
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
            `Yeni müştəri əlavə edildi. Başlanğıc borc: ${(credit / 100).toFixed(2)}₼`,
            Math.round(credit * 100)
        );

        return Response.Success("Müştəri uğurla əlavə edildi", data);
    } catch (error) {
        console.log(error)
        return Response.Error("Müştəri əlavə edilərkən xəta baş verdi", error.message);
    }
};

module.exports = { addCustomerHandler };