import sql from "better-sqlite3";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.body;
  const db = sql("sellers.db");

  const info = db
    .prepare(
      `
      UPDATE sellers SET status = 'approved' WHERE id = ?
    `
    )
    .run(id);

  res.status(200).json({ updated: info.changes });
}
