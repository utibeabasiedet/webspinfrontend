"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import ConnectBtn from "./BigButton";
import Button from "./CustomButton";
import { FaBars, FaTimes } from "react-icons/fa";
import useStateManager from "../statemanager/stateManager";
import axios from "axios";
import Image from "next/image";
import Logo from "../public/mpgassets/mpglogo.png";

const Header: React.FC = () => {
  const { realuserId, isloggedin,referalCode } = useStateManager();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any[]>([]);

  const checkLoginStatus = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://webspin-backend.onrender.com/api/users/loggedin",
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      const LoggedIn = response.data;
      setIsAuthenticated(LoggedIn);

      if (LoggedIn) {
        try {
          const userResponse = await axios.get(
            "https://webspin-backend.onrender.com/api/users/getuser",
            {
              withCredentials: true, // Send cookies for authentication
            }
          );

          setUserId(userResponse.data._id);
          isloggedin.set(true);
          referalCode.set(userResponse.data.referralCode)

          realuserId.set(userResponse.data._id);
          setUser([userResponse.data]); // Set the user data
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        isloggedin.set(false);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      isloggedin.set(false);
    }
  }, [isloggedin, realuserId,referalCode]); // Add dependencies here

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus, isloggedin]); // Include checkLoginStatus in the dependency array

  const handleToggle = () => {
    setMenuOpen(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.get(
        "https://webspin-backend.onrender.com/api/users/logout", // Replace with your actual API endpoint
        {
          withCredentials: true, // This ensures cookies are sent and received
        }
      );

      setIsAuthenticated(false);
      isloggedin.set(false); // Ensure this is updated
      realuserId.set(""); // Reset user ID on logout
    } catch (error: any) {
      console.error(
        "Error logging out:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Safely access user role
  const userRole = user.length > 0 ? user[0].role : ""; // Default to "guest" if no user is loaded

  return (
    <header className="shadow-sm z-50 bg-[#00003E] py-3 text-blue-700">
      <main className="md:px-[100px] px-5 w-full mx-auto flex justify-between items-center flex-wrap">
        <Link href="/" className="text-2xl mb-2">
          <Image src={Logo} height={70} width={70} alt="logo" />
        </Link>
        <span>{referalCode.get()}</span>

        <div onClick={handleToggle} className="cursor-pointer md:hidden">
          {menuOpen ? (
            <FaTimes className="text-[38px] text-white" />
          ) : (
            <FaBars className="text-[38px] text-white" />
          )}
        </div>

        {menuOpen && (
          <div className="flex flex-col absolute justify-start gap-5 pt-10 items-center bg-black min-h-[40vh] w-full top-16 z-50 left-0 space-x-2 md:space-x-4 mt-2 md:mt-0 pb-3">
            <Link href="/mypoint" className="text-md">
              My Points
            </Link>
            {userRole == "admin" && (
              <Link href="/summary" className="text-md">
                Summary
              </Link>
            )}
            {!isAuthenticated ? (
              <div className="flex  flex-col gap-5  pb-6 justify-center items-center">
                <Link href="/register">
                  <ConnectBtn content="Sign Up" />
                </Link>
                <Link href="/login">
                  <ConnectBtn content="Sign In" />
                </Link>
              </div>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        )}

        <div className="md:flex justify-end hidden items-center z-50 left-0 space-x-2 md:space-x-4 mt-2 md:mt-0">
          <Link href="/mypoint" className="text-md">
            My Points
          </Link>
          {userRole == "admin" && (
            <Link href="/summary" className="text-md">
              Summary
            </Link>
          )}
          {!isloggedin.get() ? (
            <div className="flex gap-3 items-center">
              <Link href="/login">Login</Link>
              <Link href="/register">
                <ConnectBtn content="Register" />
              </Link>
            </div>
          ) : (
            <Button
              title="Logout"
              btnType="submit"
              handleClick={handleLogout}
            />
          )}
        </div>
      </main>
    </header>
  );
};

export default Header;
