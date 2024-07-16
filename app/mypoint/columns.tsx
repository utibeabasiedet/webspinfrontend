"use client";
import React, { useState } from "react";
import { DataTable } from "./data-table"; // Adjust the import path as needed
import { ColumnDef } from "@tanstack/react-table";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface UserDetails {
  walletAddress: string;
  emailAddress: string;
  referralCode: string;
  points: number;
}

interface UserTableProps {
  userdetails: UserDetails[];
}

const UserTable: React.FC<UserTableProps> = ({ userdetails }) => {
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
      header: "Referral Code",
    },
    {
      accessorKey: "points",
      header: "Points",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button onClick={() => handleWithdraw()}>Withdraw</button>
      ),
    },
  ];

  // const handleWithdraw = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://webspin-backend.onrender.com/api/users/withdraw",
  //       {},
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     const updatedUser = response.data;
  //     setUser(prevUsers =>
  //       prevUsers.map(u => (u._id === updatedUser._id ? updatedUser : u))
  //     );
  //     alert("Points withdrawn successfully");
  //   } catch (error) {
  //     console.error("Error withdrawing points:", error);
  //     alert("Failed to withdraw points");
  //   }
  // };

  const handleWithdraw = () => {
    toast.info("Coming Soon!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <ToastContainer />
      {userdetails.length > 0 ? (
        <DataTable columns={columns} data={userdetails} />
      ) : (
        <div>No user data</div>
      )}
    </div>
  );
};

export default UserTable;
