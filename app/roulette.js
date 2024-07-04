"use client";
import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import axios from "axios";
import useStateManager from "../statemanager/stateManager";
import "./globals.css";
import Confetti from "react-confetti";
import Image from 'next/image'
import coin from '../public/mpgassets/mpglogo.png'
import { useToast } from "@/components/ui/use-toast";

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

const MAX_SPINS_PER_DAY = 50;

export default function Roulette() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const { realuserId } = useStateManager();
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const { toast } = useToast();

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

    const getUserPoints = async () => {
      try {
        
        const response = await axios.get(
          "https://webspin-backend.onrender.com/api/users/getuser",
          {
            withCredentials: true, // Send cookies for authentication
          }
        );
        setTotalWinnings(response.data.points);
        console.log(response.data.points)
      } catch (error) {
        console.error("Error getting user points:", error);
      }
    };

    if (realuserId.get()) {
      getSpinCount();
      getUserPoints();
    }
  }, [realuserId]);

  const handleSpinClick = async () => {
    if (!isLoggedIn) {
      // alert("Please log in to spin the wheel.");
      toast({
        variant: "destructive",
        title: "Oh No",
        description: "Please log in to spin the wheel.",
      });
      return;
    }

    if (spinCount >= MAX_SPINS_PER_DAY) {
      // alert("You have reached the maximum number of spins for today.");
      toast({
        variant: "destructive",
        title: "Oh No",
        description: "You have reached the maximum number of spins for today.",
      });
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
      const totalPointsResponse = await axios.get(
        `https://webspin-backend.onrender.com/api/users/points/${userId}`
      );
      setTotalWinnings(totalPointsResponse.data.totalPoints);
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
      <div className="text-black absolute flex justify-center items-center top-0 h-10 left-0  bg-white w-[100%]  sm:w-[25%]">
        <Image src={coin} alt="coin" height={20} />
        <Image src={coin} alt="coin" height={20} />
         {totalWinnings}
      </div>

      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={200}
        recycle={true}
        gravity={0.2}
        initialVelocityY={-10}
        drawShape={ctx => {
          const drawBubble = color => {
            ctx.beginPath();
            ctx.arc(10, 10, 10, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
          };

          const colors = ["#ff0d57", "#ff6347", "#7fffd4", "#8a2be2", "#00ffff", "#ff1493"];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          drawBubble(randomColor);
        }}
      />

      <div
        style={{}}
        className="relative w-full flex justify-center items-center ">
        <div className=" relative flex justify-center items-center  ">
          <div
            style={{ position: "relative" }}
            className="h-full wheel-container">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              outerBorderColor={["#021E35"]}
              outerBorderWidth={10}
              innerBorderColor={["#021E35"]}
              radiusLineColor={["#dedede"]}
              radiusLineWidth={1}
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
              className="wheel"
            />

            <div
              style={{
                position: "absolute",
                top: "50%",
                zIndex: 10,
                transform: "translateY(-50%)",
              }}
              className="flex justify-center h-[100px] w-full"
            >
              <button
                style={{
                  height: "58px",
                  width: "58px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
                className="animate-pulse border h-12 w-12 text-black rounded-full transition duration-300 ease-in-out bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 hover:shadow-lg active:shadow-inner transform hover:scale-105 active:scale-95"
                onClick={handleSpinClick}
              >
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
