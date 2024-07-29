const sql = require("better-sqlite3");
const db = sql("sellers.db");

const dummySellers = [
  {
    sellerName: "HotCoffee",
    sellerEmail: "hotcoffe@gmail.com",
    slug: "hotcoffee",
    image: "images/windmill.jpg",
    summary:
      "Equipped with state-of-the-art wind turbines, HotCoffee employs cutting-edge technology to maximize efficiency and energy output. The turbines are designed to operate under various wind conditions, ensuring consistent and reliable energy production.",
    walletAddress: "0xdeadBeef",
    energyType: "windmill",
  },
];

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS sellers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL,
        image TEXT NOT NULL,
        summary TEXT NOT NULL,
        sellerName TEXT NOT NULL,
        sellerEmail TEXT NOT NULL,
        walletAddress TEXT NOT NULL,
        energyType TEXT NOT NULL
    )
    `
).run();

async function initData() {
  const stmt = db.prepare(`
        INSERT INTO sellers VALUES (
            null,
            @slug,
            @image,
            @summary,
            @sellerName,
            @sellerEmail,
            @walletAddress,
            @energyType
        )
        `);

  for (const seller of dummySellers) {
    stmt.run(seller);
  }
}

initData();
