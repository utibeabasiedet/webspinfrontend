"use client";
import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import ParticlesComponent from "../components/particles";
import axios from "axios";
import useStateManager from "../statemanager/stateManager";
import "./globals.css";
import Image from "next/image";
import BG from "../public/mpgassets/bg1.webp";
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from "react-confetti";

const data = [
  { option: "1000", value: 1000 },
  { option: "Loss", value: 0 },
  { option: "Jackpot 2000", value: 2000 },
  { option: "Loss", value: 0 },
  { option: "1500", value: 1500 },
  { option: "Loss", value: 0 },
];

const MAX_SPINS_PER_DAY = 10;

export default function Roulette() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const { realuserId } = useStateManager();
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const { width, height } = useWindowSize()

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "https://webspin-backend.onrender.com/api/users/loggedin",
          {
            withCredentials: true,
          }
        );

        setIsLoggedIn(response.data);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();

    // Get the user's spin count from the backend
    const getSpinCount = async () => {
      try {
        const userId = realuserId.get();
        const response = await axios.get(
          `https://webspin-backend.onrender.com/api/users/spin-count/${userId}`
        );
        setSpinCount(response.data.spinCount);
      } catch (error) {
        console.error("Error getting spin count:", error);
      }
    };

    if (realuserId.get()) {
      getSpinCount();
    }
  }, [realuserId]);

  const handleSpinClick = async () => {
    if (!isLoggedIn) {
      alert("Please log in to spin the wheel.");
      return;
    }

    if (spinCount >= MAX_SPINS_PER_DAY) {
      alert("You have reached the maximum number of spins for today.");
      return;
    }

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const updateUserPoints = async points => {
    try {
      const userId = realuserId.get();
      const response = await axios.post(
        "https://webspin-backend.onrender.com/api/users/update-points",
        { userId, points }
      );
      console.log("Updated user data:", response.data);

      // Increment spin count after successful point update
      setSpinCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  return (
    <>
      <ParticlesComponent id="particles" />
      <div className="bg-black fixed z-[900000000000] top-0">
          <div className="">Total Winnings: {totalWinnings}</div>
          <div className="">
            Spins Today: {spinCount}/{MAX_SPINS_PER_DAY}
          </div>
        </div>
      {/* <Confetti
        drawShape={ctx => {
          ctx.beginPath();
          for (let i = 0; i < 22; i++) {
            const angle = 0.35 * i;
            const x = (0.2 + 1.5 * angle) * Math.cos(angle);
            const y = (0.2 + 1.5 * angle) * Math.sin(angle);
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.closePath();
        }}
      /> */}
      <div className=" relative  ">
        

        <div style={{ position: "relative" }} className=" h-full relative ">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            outerBorderColor={["#f2f2f2"]}
            outerBorderWidth={[10]}
            innerBorderColor={["#f2f2f2"]}
            radiusLineColor={["#dedede"]}
            radiusLineWidth={[1]}
            fontSize={15}
            textColors={["#ffffff"]}
            backgroundColors={[
              "#4169E1", // Gold
              "#000000", // Golden Yellow
              "#191970", // Goldenrod
              "#000000", // Light Goldenrod
              "#00008B", // Golden Brown
              "#000000", // Dark Goldenrod
            ]}
            onStopSpinning={() => {
              setMustSpin(false);
              const prizeValue = data[prizeNumber].value;
              setTotalWinnings(prevWinnings => prevWinnings + prizeValue);
              updateUserPoints(prizeValue);
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",

              zIndex: 6000,
              transform: "translateY(-50%)",
            }}
            className="flex animate-ping justify-center h-[100px] w-full">
            <button
              style={{
                height: "58px",
                width: "58px",
                // backgroundColor: "black",
                borderRadius: "50%",
              }}
              className="coin animate-spin border h-12 w-12 text-white rounded-full transition duration-300 ease-in-out"
              onClick={handleSpinClick}>
              SPIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
