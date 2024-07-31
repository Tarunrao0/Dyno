import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";

const db = sql("sellers.db");

export function getSellers() {
  return db.prepare("SELECT * FROM sellers").all();
}

export async function getSellerBySlug(slug) {
  return await db.prepare("SELECT * FROM sellers WHERE slug = ?").get(slug);
}

export async function saveSeller(seller) {
  seller.slug = slugify(seller.sellerName, { lower: true });

  const extension = seller.image.name.split(".").pop();
  const fileName = `${seller.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/${fileName}`);
  const bufferedImage = await seller.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("upload image failed");
    }
  });

  seller.image = `/${fileName}`;

  db.prepare(
    `
      INSERT INTO sellers
        (sellerName, sellerEmail, walletAddress, energyType, summary, image, slug)
      VALUES (
        @sellerName,
        @sellerEmail,
        @walletAddress,
        @energyType,
        @summary,
        @image,
        @slug
            )
    `
  ).run(seller);
}
