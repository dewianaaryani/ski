import Image from "next/image";
import React from "react";

export default function Ticket() {
  return (
    <section id="ticket">
      <div className="ticket-section">
        {/* Background Image */}
        <div className="ticket-bg">
          <Image
            src="/images/bg-ticket.png"
            alt="background"
            fill
            priority
            className="ticket-bg-img"
          />
        </div>

        {/* Title + UI */}
        <div className="ticket-content">
          <h1 className="font-[var(--font-zendots)] text-4xl md:text-6xl text-white tracking-widest mb-8">
            BUY YOUR TICKETS NOW
          </h1>
          <div className="reservation-box">
            <div className="reservation-item">
              <p>Date</p>
              <h4>2026-02-02</h4>
            </div>

            <div className="reservation-item">
              <p>Amount</p>

              <div className="amount-control">
                <button className="amount-btn">+</button>
                <h4>1</h4>
                <button className="amount-btn">-</button>
              </div>
            </div>

            <div className="reservation-item">
              <p>Location</p>
              <h4>Jakarta</h4>
            </div>

            <div className="reservation-item">
              <p>Type</p>
              <h4>VIP</h4>
            </div>

            <div className="reservation-item">
              <p>Price</p>
              <h4>$120</h4>
            </div>
          </div>
        </div>
        {/* Main Foreground Image */}
        <Image
          src="/images/main-ticket.png"
          alt="main"
          width={400}
          height={400}
          className="ticket-main-img"
        />
      </div>
    </section>
  );
}
