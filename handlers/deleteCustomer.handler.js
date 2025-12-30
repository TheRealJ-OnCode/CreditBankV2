const Response = require("../utils/Response.class");
const { db } = require("../db/db");
const { userSchema } = require("../schema/schema");
const { eq } = require("drizzle-orm");

const deleteCustomerHandler = async (event, customerId) => {
    try {
        await db.update(userSchema)
            .set({
                isActive: 0
            })
            .where(eq(userSchema.id, customerId));
        
        return Response.Success("Müştəri silindi", { customerId });
    } catch (error) {
        console.log(error)
        return Response.Error("Müştəri silinərkən xəta baş verdi", error.message);
    }
};

module.exports = { deleteCustomerHandler };