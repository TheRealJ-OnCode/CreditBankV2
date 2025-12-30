const Response = require("../../utils/Response.class");
const { db } = require("../../db/db");
const { userSchema } = require("../../schema/schema");

const getCustomersHandler = async () => {
    try {
        const customers = await db.select().from(userSchema);
        
        const formattedCustomers = customers.map(c => ({
            ...c,
            credit: c.credit / 100,
            initialDebt: c.initialDebt / 100,
            lastPaymentAmount: c.lastPaymentAmount ? c.lastPaymentAmount / 100 : 0
        }));
        
        return Response.Success("Müştərilər uğurla gətirildi", formattedCustomers);
    } catch (error) {
        return Response.Error("Müştərilər gətirilərkən xəta baş verdi", error.message);
    }
};

module.exports = { getCustomersHandler };