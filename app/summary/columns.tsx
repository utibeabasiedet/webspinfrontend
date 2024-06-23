'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from './data-table'; // Adjust the import path as needed
import { ColumnDef } from '@tanstack/react-table';

const UserTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns: ColumnDef<any, any>[] = [
    // {
    //   accessorKey: '_id',
    //   header: 'ID',
    // },
    {
      accessorKey: 'walletAddress',
      header: 'Wallet Address',
    },
    {
      accessorKey: 'emailAddress',
      header: 'Email Address',
    },
    {
      accessorKey: 'points',
      header: 'Points',
    },
    {
      accessorKey: 'withdrawnPoints',
      header: 'Withdrawn Points',
    },
    {
      accessorKey: 'totalPaid',
      header: 'Total Paid',
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <button onClick={() => handlePayUser(row.original._id)}>
          Pay User
        </button>
      ),
    },
  ];

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/users/loggedin',
          {
            withCredentials: true,
          }
        );

        const isLoggedIn = response.data;

        if (isLoggedIn) {
          try {
            const userResponse = await axios.get(
              'http://localhost:5000/api/users/getalluser', // Correct the endpoint if necessary
              {
                withCredentials: true,
              }
            );

            setUsers(userResponse.data); // Directly set the response data
            setLoading(false);
          } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handlePayUser = async (userId: string) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/pay',
        { userId },
        {
          withCredentials: true,
         
        }
      );

      const updatedUser = response.data;
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === userId ? { ...u, ...updatedUser } : u))
      );
      alert('Payment processed successfully');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment');
    }
  };

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users.length > 0 ? (
        <DataTable columns={columns} data={users} />
      ) : (
        <div>No user data</div>
      )}
    </div>
  );
};

export default UserTable;
