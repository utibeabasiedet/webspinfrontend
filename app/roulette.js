"use client";
import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
// import ParticlesComponent from "../components/particles";
import axios from "axios";
import useStateManager from "../statemanager/stateManager";
import "./globals.css";

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
      {/* <ParticlesComponent id="particles" /> */}
      <div className="bg-red-700 relative  ">
        <div className="">Total Winnings: {totalWinnings}</div>
        <div className="">
          Spins Today: {spinCount}/{MAX_SPINS_PER_DAY}
        </div>

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
              "#F22B35",
              "#514E50",
              "#24CA69",
              "#514E50",
              "#46AEFF",
              "#514E50",
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
            className="flex justify-center h-[100px] w-full">
            <button
              style={{
                height: "58px",
                width: "58px",
                backgroundColor: "black",
                borderRadius: "50%",
              }}
              className="bg-black border h-12 w-12 text-white rounded-full transition duration-300 ease-in-out"
              onClick={handleSpinClick}>
              SPIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
