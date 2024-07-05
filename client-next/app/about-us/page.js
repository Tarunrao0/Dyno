"use client"; // Ensure this is treated as a client component

import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import dynoImage from "../../public/dyno.png"; // Ensure dyno.png is in the correct path

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div
          onClick={() => (window.location.href = "/")}
          className={styles.logo}
        >
          <img src={dynoImage.src} alt="Navbar brand" />
        </div>
        <Link href="/buy-energy">Buy Energy</Link>
        <Link href="/dyno-swap">Buy/Sell</Link>
        <Link href="/about-us">About Us</Link>
      </nav>
      <div className={styles.content}>
        <div className={styles.left}>
          <img className={styles.pic} alt="Pic" src="/Dyno_coin.png" />
        </div>
        <div className={styles.right}>
          <div className={styles.textWrapper4}>About Us</div>

          <div className={styles.paragraph}>
            <h2 className={styles.heading}>Our Vision</h2>
            <p>
              We aim for a decentralized, transparent, and efficient energy
              future. Our platform empowers users with secure, tamper-proof
              energy transactions and data management.
            </p>
          </div>

          <div className={styles.paragraph}>
            <h2 className={styles.heading}>What We Do</h2>
            <p>
              Smart Power Management: Real-time tracking and optimization of
              energy usage. Blockchain Technology: Secure, transparent, and
              immutable energy transactions. Dyno Coin: Facilitates secure
              transactions and rewards for energy savings.
            </p>
          </div>

          <div className={styles.paragraph}>
            <h2 className={styles.heading}>Join Us</h2>
            <p>
              Join Dyno in creating a smarter, more sustainable world by
              redefining energy management and making a lasting environmental
              impact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
