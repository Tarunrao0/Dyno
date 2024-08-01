"use client";

import { useState, useEffect } from "react";
import { useGrantRoles } from "@/hooks/use-grant-roles";

export default function AdminPanel() {
  const [pendingSellers, setPendingSellers] = useState([]);
  const { grantRole } = useGrantRoles();

  useEffect(() => {
    async function fetchPendingSellers() {
      try {
        const response = await fetch("/api/sellers/pending");
        const data = await response.json();
        setPendingSellers(data);
      } catch (error) {
        console.error("Error fetching pending sellers:", error);
      }
    }

    fetchPendingSellers();
  }, []);

  const handleApprove = async (seller) => {
    try {
      await grantRole(seller.walletAddress);
      console.log(`Role granted to ${seller.walletAddress}`);

      await fetch("/api/sellers/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: seller.id }),
      });

      setPendingSellers((prev) => prev.filter((s) => s.id !== seller.id));
    } catch (error) {
      console.error("Error approving seller:", error);
    }
  };

  return (
    <div>
      <h1>Pending Sellers for Approval</h1>
      <ul>
        {pendingSellers.map((seller) => (
          <li key={seller.id}>
            <p>Name: {seller.sellerName}</p>
            <p>Email: {seller.sellerEmail}</p>
            <p>Wallet Address: {seller.walletAddress}</p>
            <p>Energy Type: {seller.energyType}</p>
            <button onClick={() => handleApprove(seller)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
