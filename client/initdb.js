const sql = require("better-sqlite3");
const db = sql("sellers.db");

const dummySellers = [
  {
    slug: "example-seller",
    sellerName: "Example Seller",
    sellerEmail: "example@seller.com",
    walletAddress: "0xexampleaddress",
    energyType: "solar",
    summary: "This is an example seller.",
    image: "path/to/image.jpg",
    status: "approved",
  },
];

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS sellers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL,
        sellerName TEXT NOT NULL,
        sellerEmail TEXT NOT NULL,
        walletAddress TEXT NOT NULL,
        energyType TEXT NOT NULL,
        summary TEXT NOT NULL,
        image TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending'
    )
    `
).run();

async function initData() {
  const stmt = db.prepare(`
        INSERT INTO sellers VALUES (
            null,
            @slug,
            @sellerName,
            @sellerEmail,
            @walletAddress,
            @energyType,
            @summary,
            @image,
            @status
        )
        `);

  for (const seller of dummySellers) {
    stmt.run(seller);
  }
}

initData();
