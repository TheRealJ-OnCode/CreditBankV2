const Response = require("../../utils/Response.class");
const { db } = require("../../db/db");
const { userSchema } = require("../../schema/schema");
const { eq } = require("drizzle-orm");
const { createLog } = require("../../utils/logHelper");

const deleteCustomerHandler = async (event, customerId) => {
    try {
        const customer = await db.select().from(userSchema).where(eq(userSchema.id, customerId));
        
        await db.update(userSchema)
            .set({
                isActive: 0
            })
            .where(eq(userSchema.id, customerId));

        await createLog(
            customerId,
            customer[0].name,
            "SILINDI",
            `Müştəri silindi`,
            null
        );
        
        return Response.Success("Müştəri silindi", { customerId });
    } catch (error) {
        console.log(error)
        return Response.Error("Müştəri silinərkən xəta baş verdi", error.message);
    }
};

module.exports = { deleteCustomerHandler };