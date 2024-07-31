"use server";

import { saveSeller } from "./sellers";

export async function submitForm(formData) {
  const seller = {
    sellerName: formData.get("sellerName"),
    sellerEmail: formData.get("sellerEmail"),
    walletAddress: formData.get("walletAddress"),
    energyType: formData.get("energyType"),
    summary: formData.get("summary"),
    image: formData.get("image"),
  };

  await saveSeller(seller);
}
