const Response = require("../../utils/Response.class");
const { db } = require("../../db/db");
const { userSchema } = require("../../schema/schema");
const { eq } = require("drizzle-orm");
const { createLog } = require("../../utils/logHelper");
const { parseAmount } = require("../../utils/matHelper");

const updateCustomerHandler = async (event, customerId, customerData) => {
    try {
        const customer = await db.select().from(userSchema).where(eq(userSchema.id, customerId));
        
        const updateData = {};
        
        if (customerData.name !== undefined) updateData.name = customerData.name;
        if (customerData.phone !== undefined) updateData.phone = customerData.phone || null;
        if (customerData.credit !== undefined) updateData.credit = parseAmount(customerData.credit);
        if (customerData.initialDebt !== undefined) updateData.initialDebt = parseAmount(customerData.initialDebt);
        if (customerData.specialInfo !== undefined) updateData.specialInfo = customerData.specialInfo || null;
        if (customerData.startingDate !== undefined) updateData.startingDate = customerData.startingDate || null;
        if (customerData.lastPaymentAmount !== undefined) updateData.lastPaymentAmount = parseAmount(customerData.lastPaymentAmount);
        if (customerData.lastPaymentTime !== undefined) updateData.lastPaymentTime = customerData.lastPaymentTime || null;
        if (customerData.isActive !== undefined) updateData.isActive = customerData.isActive;
        
        await db.update(userSchema)
            .set(updateData)
            .where(eq(userSchema.id, customerId));

        if (customerData.isActive === 1) {
            await createLog(
                customerId,
                customer[0].name,
                "GERI_QAYTARILDI",
                `Müştəri geri qaytarıldı`,
                null
            );
        } else if (customerData.lastPaymentAmount) {
            await createLog(
                customerId,
                customer[0].name,
                "ODENIS",
                `Ödəniş edildi`,
                parseAmount(customerData.lastPaymentAmount)
            );
        } else if (updateData.credit && updateData.credit > customer[0].credit) {
            const addedDebt = updateData.credit - customer[0].credit;
            await createLog(
                customerId,
                customer[0].name,
                "BORC_ELAVE",
                `Borc əlavə edildi`,
                addedDebt
            );
        }
        
        return Response.Success("Müştəri məlumatları yeniləndi", customerData);
    } catch (error) {
        console.log(error)
        return Response.Error("Müştəri yenilənərkən xəta baş verdi", error.message);
    }
};

module.exports = { updateCustomerHandler };