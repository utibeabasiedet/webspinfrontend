"use client";
import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import axios from "axios";
import useStateManager from "../statemanager/stateManager";
import "./globals.css";
import Confetti from "react-confetti";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const data = [
  { option: "50000", value: 50000 },
  { option: "Loss", value: 0 },
  { option: "Jackpot", value: 200000 },

  { option: "30000", value: 30000 },
  { option: "70000", value: 70000 },
  { option: "Loss", value: 0 },
 
  { option: "80000", value: 80000 },
  { option: "Loss", value: 0 },
  { option: " 40,000", value: 200000 },
  { option: "90000", value: 90000 },
  { option: "100000", value: 100000 },
  { option: "Loss", value: 0 },
];

const MAX_SPINS_PER_DAY = 15;

export default function Roulette() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const { realuserId } = useStateManager();
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
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

      setSpinCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  const handleSpinEnd = () => {
    setMustSpin(false);
    const prizeValue = data[prizeNumber].value;
    setTotalWinnings(prevWinnings => prevWinnings + prizeValue);
    updateUserPoints(prizeValue);
    setDialogMessage(
      prizeValue > 0
        ? `Congratulations! You won ${prizeValue} points!`
        : "Sorry, you lost. Better luck next time!"
    );
    setShowDialog(true);
  };

  return (
    <div className="overflow-hidden">
      <div className="text-white bg-black  w-[100%]">
        Today: {totalWinnings}
      </div>

      <Confetti
        drawShape={ctx => {
          const drawCoin = color => {
            ctx.beginPath();
            ctx.arc(10, 10, 10, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 10px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("MPG", 10, 10);
          };

          const drawBitcoin = () => drawCoin("#f7931a");
          const drawEthereum = () => drawCoin("#3c3c3d");
          const drawLitecoin = () => drawCoin("#bebebe");

          const shapes = [drawBitcoin, drawEthereum, drawLitecoin];
          const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
          randomShape();
        }}
      />

      <div
        style={{}}
        className="relative w-full flex justify-center items-center h-full">
        <div className=" relative flex justify-center items-center  ">
          <div
            style={{ position: "relative" }}
            className=" h-full bg-red-400 relative ">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              outerBorderColor={[
                "#021E35",
              ]}
              outerBorderWidth={[10]}
              innerBorderColor={["#021E35"]}
              radiusLineColor={["#dedede"]}
              radiusLineWidth={[1]}
              fontSize={15}
              textColors={["#ffffff"]}
              backgroundColors={[
                "#F8B214",
                "#02B68F",
                "#FA4C29",
                "#043570",
                "#F8B214",
                "#02B68F",
                "#FA4C29",
                "#043570",
                "#F8B214",
                "#02B68F",
                "#FA4C29",
                "#043570",
              ]}
              onStopSpinning={handleSpinEnd}
            />

            <div
              style={{
                position: "absolute",
                top: "50%",
                zIndex: 10,
                transform: "translateY(-50%)",
              }}
              className="flex animate-pulse justify-center h-[100px] w-full">
              <button
                style={{
                  height: "58px",
                  width: "58px",
                  // backgroundColor: "#7400D3",
                  borderRadius: "50%",
                }}
                className="coin3 animate-pulse border h-12 w-12 text-white rounded-full transition duration-300 ease-in-out"
                onClick={handleSpinClick}>
                SPIN
              </button>
            </div>
          </div>
        </div>
        <div className="z-index">
          <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Spin Result</AlertDialogTitle>
                <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <button onClick={() => setShowDialog(false)}>Close</button>
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
