const Response = require("../utils/Response.class");

const addCustomerHandler = async (event, data) => {
    return new Promise((resolve, reject) => {
       resolve( Response.Success("Zordu"))
    })
};
module.exports = { addCustomerHandler }