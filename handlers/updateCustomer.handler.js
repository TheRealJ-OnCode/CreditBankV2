const Response = require("../utils/Response.class");
const { db } = require("../db/db");
const { userSchema } = require("../schema/schema");
const { eq } = require("drizzle-orm");

const updateCustomerHandler = async (event, customerId, customerData) => {
    try {
        await db.update(userSchema)
            .set({
                name: customerData.name,
                phone: customerData.phone || null,
                credit: customerData.credit,
                initialDebt: customerData.initialDebt,
                specialInfo: customerData.specialInfo || null,
                startingDate: customerData.startingDate || null,
                lastPaymentAmount: customerData.lastPaymentAmount || null,
                lastPaymentTime: customerData.lastPaymentTime || null
            })
            .where(eq(userSchema.id, customerId));
        
        return Response.Success("Müştəri məlumatları yeniləndi", customerData);
    } catch (error) {
        console.log(errror)
        return Response.Error("Müştəri yenilənərkən xəta baş verdi", error.message);
    }
};

module.exports = { updateCustomerHandler };