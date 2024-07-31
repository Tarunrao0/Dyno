const sql = require("better-sqlite3");
const db = sql("sellers.db");

const dummySellers = [
  {
    slug: "hotcoffee",
    sellerName: "HotCoffee",
    sellerEmail: "hotcoffe@gmail.com",
    walletAddress: "0xdeadBeef",
    energyType: "windmill",
    summary:
      "Equipped with state-of-the-art wind turbines, HotCoffee employs cutting-edge technology to maximize efficiency and energy output. The turbines are designed to operate under various wind conditions, ensuring consistent and reliable energy production.",
    image: "images/windmill.jpg",
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
        image TEXT NOT NULL
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
            @image
        )
        `);

  for (const seller of dummySellers) {
    stmt.run(seller);
  }
}

initData();
