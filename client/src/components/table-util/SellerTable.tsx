import { getSellers } from "../../../lib/sellers";
import Table from "./Table";

export default async function SellerTable() {
  const sellers = getSellers();
  return (
    <>
      <div>
        <Table sellers={sellers} />
      </div>
    </>
  );
}
