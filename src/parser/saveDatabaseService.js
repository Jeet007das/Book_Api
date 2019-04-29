const db = require('../common/db');
const Total = db.Total;


async function saveDataBaseService(total, callback){
    let totalObj = {
        totalAmount: total
    }
    const totalDb = await new Total(totalObj)
    await totalDb.save();
    callback(null,"saving successfully");
}

module.exports = saveDataBaseService;