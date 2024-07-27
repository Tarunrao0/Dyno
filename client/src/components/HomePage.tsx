"use client";

import Modal from "./Modal";
import { Fragment, useState } from "react";
import SellerTable from "./table-util/SellerTable";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
      <div>
        <SellerTable />
      </div>
      <div className="ml-96">
        <button
          className=" bg-inkblue font-black ml-96 px-6 py-2 text-oatmilk rounded-2xl transition-transform duration-300 hover:-translate-y-2"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Become a seller
        </button>
      </div>
      <Modal isOpen={showModal} />
    </Fragment>
  );
}
