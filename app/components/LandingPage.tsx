import React from "react";
import Hero from "./Hero";
import SkiTicketBooking from "./SkiTicketBooking";

import Catalog from "./Catalog";

export default function LandingPage() {
  return (
    <main>
      <Hero />

      <SkiTicketBooking />
      <Catalog />
    </main>
  );
}
