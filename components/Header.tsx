// "use client";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import ConnectBtn from "./BigButton";
// import Button from "./CustomButton";
// import { FaBars, FaTimes } from "react-icons/fa";
// import useStateManager from "../statemanager/stateManager";
// import axios from "axios";

// const Header: React.FC = () => {
//   const { realuserId, isloggedin } = useStateManager();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);

//   const checkLoginStatus = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/users/loggedin",
//         {
//           withCredentials: true, // Ensure cookies are sent with the request
//         }
//       );

//       const LoggedIn = response.data;
//       setIsAuthenticated(LoggedIn);

//       if (LoggedIn) {
//         try {
//           const userResponse = await axios.get(
//             "http://localhost:5000/api/users/getuser",
//             {
//               withCredentials: true, // Send cookies for authentication
//             }
//           );

//           setUserId(userResponse.data._id);
//           isloggedin.set(true);
//           realuserId.set(userResponse.data._id);
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         isloggedin.set(false);
//       }
//     } catch (error) {
//       console.error("Error checking login status:", error);
//       isloggedin.set(false);
//     }
//   };

//   useEffect(() => {
//     checkLoginStatus();
//   }, [isloggedin]);

//   const handleToggle = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/users/logout", // Replace with your actual API endpoint
//         {
//           withCredentials: true, // This ensures cookies are sent and received
//         }
//       );

//       setIsAuthenticated(false);
//       isloggedin.set(false); // Ensure this is updated
//       realuserId.set(""); // Reset user ID on logout
//     } catch (error: any) {
//       console.error(
//         "Error logging out:",
//         error.response?.data?.message || error.message
//       );
//     }
//   };

//   return (
//     <header className="shadow-sm z-50 shadow-blue-900 py-4 text-blue-700 bg-[#010922]">
//       <main className="md:px-[100px] px-5 w-full mx-auto flex justify-between items-center flex-wrap">
//         <Link href="/" className="text-2xl mb-2">
//           <span className="text-gray-300">MPG</span>
//           <span>Coin</span>
//         </Link>

//         <div onClick={handleToggle} className="cursor-pointer md:hidden">
//           {menuOpen ? (
//             <FaTimes className="text-[38px] text-white" />
//           ) : (
//             <FaBars className="text-[38px] text-white" />
//           )}
//         </div>

//         {menuOpen && (
//           <div className="flex flex-col absolute justify-start gap-5 pt-10 items-center bg-blue-700 h-[40vh] w-full top-16 z-50 left-0 space-x-2 md:space-x-4 mt-2 md:mt-0">
//             <Link href="/games" className="text-md text-white">
//               My Games
//             </Link>
//             <Link href="/summary" className="text-md text-white">
//               Summary
//             </Link>
//             {!isAuthenticated ? (
//               <Link href="/register">
//                 <ConnectBtn content="Sign Up" />
//               </Link>
//             ) : (
//               <button onClick={handleLogout}>Logout</button>
//             )}
//           </div>
//         )}

//         <div className="md:flex justify-end hidden items-center z-50 left-0 space-x-2 md:space-x-4 mt-2 md:mt-0">
//           <Link href="/mypoint" className="text-md text-white">
//             My Points
//           </Link>
//           <Link href="/summary" className="text-md text-white">
//             Summary
//           </Link>
//           {!isloggedin.get() ? (
//             <div className="flex gap-3 items-center">
//               <a href="/login">Loging</a>
//               <Link href="/register">
//                 <ConnectBtn content="Register" />
//               </Link>
//             </div>
//           ) : (
//             <Button
//               title="Logout"
//               btnType="submit"
//               handleClick={handleLogout}
//             />
//           )}
//         </div>
//       </main>
//     </header>
//   );
// };

// export default Header;
"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import ConnectBtn from "./BigButton";
import Button from "./CustomButton";
import { FaBars, FaTimes } from "react-icons/fa";
import useStateManager from "../statemanager/stateManager";
import axios from "axios";
import Image from "next/image";
import Logo from '../public/mpgassets/mpglogo.png'

const Header: React.FC = () => {
  const { realuserId, isloggedin } = useStateManager();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

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
          realuserId.set(userResponse.data._id);
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
  }, [isloggedin, realuserId]); // Add dependencies here

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus, isloggedin]); // Include checkLoginStatus in the dependency array

  const handleToggle = () => {
    setMenuOpen(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
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

  return (
    <header className="shadow-sm z-50 bg-gray-100 py-3 text-blue-700 ">
      <main className="md:px-[100px] px-5 w-full mx-auto flex justify-between items-center flex-wrap">
        <Link href="/" className="text-2xl mb-2">
          <Image src={Logo} height={70} width={70} alt='logo' />
          {/* <span className="">MPG</span>
          <span>Token</span> */}
        </Link>

        <div onClick={handleToggle} className="cursor-pointer md:hidden">
          {menuOpen ? (
            <FaTimes className="text-[38px] text-white" />
          ) : (
            <FaBars className="text-[38px] text-white" />
          )}
        </div>

        {menuOpen && (
          <div className="flex flex-col absolute justify-start gap-5 pt-10 items-center bg-black min-h-[40vh] w-full top-16 z-50 left-0 space-x-2 md:space-x-4 mt-2 md:mt-0 pb-3">
            <Link href="/mypoint" className="text-md ">
              My Points
            </Link>
            <Link href="/summary" className="text-md ">
              Summary
            </Link>
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
          <Link href="/mypoint" className="text-md ">
            My Points
          </Link>
          <Link href="/summary" className="text-md ">
            Summary
          </Link>
          {!isloggedin.get() ? (
            <div className="flex gap-3 items-center">
              <a href="/login">Loging</a>
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
