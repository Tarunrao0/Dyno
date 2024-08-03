const sql = require("better-sqlite3");

const db = sql("sellers.db");

// Remove the invalid slug
db.prepare("DELETE FROM sellers WHERE sellerName = 'test'").run();
db.prepare("DELETE FROM sellers WHERE sellerName = 'Bignameiwannatest'").run();
db.prepare("DELETE FROM sellers WHERE sellerName = 'testingbignames'").run();

console.log("Invalid sellers removed.");
