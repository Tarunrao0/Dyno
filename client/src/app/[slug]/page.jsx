"use server";

import { getSellerBySlug } from "../../../lib/sellers";
import SellerPage from "./SellerPage";

export default async function Page({ params }) {
  const { slug } = params;
  const sellerData = await getSellerBySlug(slug);

  if (!sellerData) {
    return <div>Pool not found</div>;
  }

  return <SellerPage sellerData={sellerData} />;
}
