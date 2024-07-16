"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./columns"; // Adjust the import path as needed
import useStateManager from "@/statemanager/stateManager";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Referral {
  email: string;
  points: number;
}

function App() {
  const { referalCode } = useStateManager();
  const [referralLink, setReferralLink] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [user, setUser] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<Referral[]>([]);

  const [walletAddress, setWalletAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReferralLink(
        `${window.location.origin}/register?referralCode=${referalCode.get()}`
      );
    }
  }, [referalCode]);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await axios.get(
          "https://webspin-backend.onrender.com/api/users/referred-users",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.data && response.data.referredUsers) {
          setReferrals(response.data.referredUsers);
        }
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          "https://webspin-backend.onrender.com/api/users/getuser",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.data) {
          setWalletAddress(response.data.walletAddress);
          setEmailAddress(response.data.emailAddress);
        }
      } catch (error) {
        console.error("Error fetching current user data:", error);
      }
    };

    fetchReferrals();
    fetchCurrentUser();
  }, []);

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

            setUser([userResponse.data]);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const handleSaveChanges = async () => {
      try {
        await axios.put(
          "https://webspin-backend.onrender.com/api/users/edit",
          {
            walletAddress,
            emailAddress,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    };

    if (user.length > 0) {
      handleSaveChanges();
    }
  }, [user, walletAddress, emailAddress]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch(() => {
        setCopySuccess("Failed to copy!");
        setTimeout(() => setCopySuccess(""), 2000);
      });
  };

  return (
    <div className="App px-5 md:px-10 pt-11">
      <UserTable userdetails={user} />
      <div className="flex gap-2 mt-3 mb-3">
        {referralLink && (
          <div className="">
            <Button
              onClick={copyToClipboard}
              className="bg-transparent text-black hover:text-white px-3 py-1 rounded">
              Copy Referral Link
            </Button>
            {copySuccess && (
              <span className="ml-2 text-green-500">{copySuccess}</span>
            )}
          </div>
        )}

        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you are
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="walletAddress" className="text-right">
                    Wallet Address
                  </Label>
                  <Input
                    id="walletAddress"
                    value={walletAddress}
                    onChange={e => setWalletAddress(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="emailAddress" className="text-right">
                    Email Address
                  </Label>
                  <Input
                    id="emailAddress"
                    value={emailAddress}
                    onChange={e => setEmailAddress(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => setUser([{ walletAddress, emailAddress }])}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {referrals.length > 0 ? (
        <ul>
          <h2>
            Number of referals 
            <Button className="h-[40px] w-[40px] ml-1 text-white rounded-full">
              {referrals.length}
            </Button>
          </h2>
        </ul>
      ) : (
        <p>No referrals yet.</p>
      )}
    </div>
  );
}

export default App;
