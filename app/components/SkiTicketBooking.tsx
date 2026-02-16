"use client";
import { Calendar1, Minus, MinusCircle, Plus } from "lucide-react";
import React, { useState } from "react";

export default function SkiTicketBooking() {
  const [snow, setSnow] = useState<
    {
      top: number;
      left: number;
      duration: number;
      delay: number;
    }[]
  >([]);
  React.useEffect(() => {
    const flakes = Array.from({ length: 20 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 3,
    }));

    setSnow(flakes);
  }, []);

  const [date, setDate] = useState("2026-04-20");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);

  const handleIncrement = (type: string) => {
    if (type === "adult") setAdults((prev) => prev + 1);
    else setChildren((prev) => prev + 1);
  };

  const handleDecrement = (type: string) => {
    if (type === "adult" && adults > 0) setAdults((prev) => prev - 1);
    else if (type === "children" && children > 0)
      setChildren((prev) => prev - 1);
  };

  const handleBook = () => {
    alert(`Booking:\nDate: ${date}\nAdults: ${adults}\nChildren: ${children}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image layer */}
      <div className="absolute inset-0">
        <img
          src="images/bg-plain.png"
          alt="Background"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Header text - behind the skier */}
      <div className="absolute top-14 left-0 right-0 z-10 pt-12 px-8">
        <h1 className="text-white text-5xl md:text-6xl font-bold tracking-widest text-center drop-shadow-lg font-family-zendots">
          BUY YOUR TICKETS NOW
        </h1>
      </div>

      {/* Skier subject image - on top of text */}
      {/* Skier subject image */}
      <div
        className="
  absolute inset-0 z-20 pointer-events-none
  flex items-center justify-center
  px-4
"
      >
        <img
          src="images/main-ticket.png"
          alt="Skier"
          className="
      object-contain

      w-[108%] sm:w-[90%] md:w-[65%] lg:w-[60%] xl:w-[50%] 2xl:w-[45%]
      max-w-4xl
-translate-x-4
    "
        />
      </div>

      {/* Decorative snow particles */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {snow.map((flake, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              top: `${flake.top}%`,
              left: `${flake.left}%`,
              animation: `fall ${flake.duration}s linear infinite`,
              animationDelay: `${flake.delay}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>

      {/* Booking form card */}
      <div className="relative z-30 flex items-end justify-center h-full pb-12 px-4">
        {/* Glow Background */}
        <div className="absolute inset-x-0 bottom-6 mx-auto w-[90%] h-28 bg-cyan-400/20 blur-3xl rounded-full" />

        {/* Main Card */}
        <div className="relative bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-end">
            {/* Reservation */}
            <div className="flex items-center justify-center h-full">
              <h3 className="text-xl font-bold tracking-wide text-gray-800">
                Reservation
              </h3>
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-500 text-sm mb-1">Date</label>

              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="
              w-full px-4 py-3 pr-10
              rounded-xl
              border border-gray-200
              bg-white/70
              text-gray-700
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-400
              focus:border-transparent
              transition
            "
                />

                <Calendar1 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Adult */}
            <div>
              <label className="block text-gray-500 text-sm mb-1">Adult</label>

              <div className="flex items-center justify-between gap-2 bg-white/70 rounded-xl px-3 py-2 border border-gray-200">
                <button
                  onClick={() => handleDecrement("adult")}
                  className="
              w-9 h-9
              rounded-full
              bg-gray-100
              hover:bg-gray-200
              flex items-center justify-center
              transition
            "
                >
                  <MinusCircle className="w-5 h-5 text-gray-600" />
                </button>

                <span className="text-lg font-bold text-gray-800">
                  {adults}
                </span>

                <button
                  onClick={() => handleIncrement("adult")}
                  className="
              w-9 h-9
              rounded-full
              bg-cyan-400
              hover:bg-cyan-500
              flex items-center justify-center
              transition
            "
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div>
              <label className="block text-gray-500 text-sm mb-1">
                Children
              </label>

              <div className="flex items-center justify-between gap-2 bg-white/70 rounded-xl px-3 py-2 border border-gray-200">
                <button
                  onClick={() => handleDecrement("children")}
                  className="
              w-9 h-9
              rounded-full
              bg-gray-100
              hover:bg-gray-200
              flex items-center justify-center
              transition
            "
                >
                  <Minus className="w-5 h-5 text-gray-600" />
                </button>

                <span className="text-lg font-bold text-gray-800">
                  {children}
                </span>

                <button
                  onClick={() => handleIncrement("children")}
                  className="
              w-9 h-9
              rounded-full
              bg-cyan-400
              hover:bg-cyan-500
              flex items-center justify-center
              transition
            "
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Book Button */}
            <div className="col-span-2 md:col-span-1">
              <button
                onClick={handleBook}
                className="
            relative w-full h-[52px]
            rounded-xl
            font-bold
            text-white
            tracking-wider
            uppercase

            bg-gradient-to-r
            from-cyan-400
            via-sky-500
            to-blue-500

            shadow-lg
            shadow-cyan-500/40

            hover:shadow-xl
            hover:shadow-cyan-500/60
            hover:scale-[1.03]

            active:scale-95

            transition-all
            duration-300
          "
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
