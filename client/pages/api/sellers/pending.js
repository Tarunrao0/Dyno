import sql from "better-sqlite3";

export default function handler(req, res) {
  const db = sql("sellers.db");

  const pendingSellers = db
    .prepare(
      `
      SELECT * FROM sellers WHERE status = 'pending'
    `
    )
    .all();

  res.status(200).json(pendingSellers);
}
