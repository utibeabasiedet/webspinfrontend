"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "./data-table"; // Adjust the import path as needed
import { ColumnDef } from "@tanstack/react-table";

const UserTable = () => {
  const [user, setUser] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "walletAddress",
      header: "Wallet Address",
    },
    {
      accessorKey: "emailAddress",
      header: "Email Address",
    },
    {
      accessorKey: "referralCode",
      header: "Referal Code",
    },
    {
      accessorKey: "points",
      header: "Points",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button onClick={() => handleWithdraw()}>
          Withdraw
        </button>
      ),
    },
  ];

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "https://webspin-backend.onrender.com/api/users/loggedin",
          {
            withCredentials: true,
          }
        );

        const isLoggedIn = response.data;

        if (isLoggedIn) {
          try {
            const userResponse = await axios.get(
              "https://webspin-backend.onrender.com/api/users/getuser",
              {
                withCredentials: true,
              }
            );

            setUser([userResponse.data]); // Wrapping user data in an array
            setLoading(false);
          } catch (error) {
            console.error("Error fetching user data:", error);
            // setError(error);
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        // setError(error);
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleWithdraw = async () => {
    try {
      const response = await axios.post(
        "https://webspin-backend.onrender.com/api/users/withdraw",
        {},
        {
          withCredentials: true,
        }
      );

      const updatedUser = response.data;
      setUser((prevUsers) =>
        prevUsers.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );
      alert("Points withdrawn successfully");
    } catch (error) {
      console.error("Error withdrawing points:", error);
      alert("Failed to withdraw points");
    }
  };

  if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {user.length > 0 ? (
        <DataTable columns={columns} data={user} />
      ) : (
        <div>No user data</div>
      )}
    </div>
  );
};

export default UserTable;
