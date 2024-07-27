import sql from "better-sqlite3";

const db = sql("sellers.db");

export function getSellers() {
  return db.prepare("SELECT * FROM sellers").all();
}
