"use client";
import React, { useEffect, useState } from "react";
import UserTable from "./columns"; // Adjust the import path as needed
import useStateManager from "@/statemanager/stateManager";
import { Button } from "@/components/ui/button";
import axios from "axios"; 
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

// Define a type for the referral data
interface Referral {
  email: string;
  points: number;
}

function App() {
  const { referalCode } = useStateManager();
  const [referralLink, setReferralLink] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [referrals, setReferrals] = useState<Referral[]>([]); // Use the defined type for state

  // State for form inputs
  const [walletAddress, setWalletAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  // State to manage dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReferralLink(
        `${window.location.origin}/register?referralCode=${referalCode.get()}`
      );
    }
  }, [referalCode]);

  useEffect(() => {
    // Fetch referral data from the backend
    const fetchReferrals = async () => {
      try {
        const response = await axios.get(
          "https://webspin-backend.onrender.com/api/users/referred-users",
          {
            headers: {
              "Content-Type": "application/json",
              // Include any necessary authentication headers here
              // 'Authorization': `Bearer ${yourAuthToken}`
            },
            withCredentials: true, // Ensure this is included
          }
        );
        console.log("API Response:", response.data); // Log the response data
        if (response.data && response.data.referredUsers) {
          setReferrals(response.data.referredUsers);
        } else {
          console.warn("No referred users found in the response");
        }
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };

    fetchReferrals();

    // Fetch current user data to populate the fields
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          "https://webspin-backend.onrender.com/api/users/current",
          {
            headers: {
              "Content-Type": "application/json",
              // Include any necessary authentication headers here
              // 'Authorization': `Bearer ${yourAuthToken}`
            },
            withCredentials: true, // Ensure this is included
          }
        );
        console.log("Current User API Response:", response.data); // Log the response data
        if (response.data) {
          setWalletAddress(response.data.walletAddress);
          setEmailAddress(response.data.emailAddress);
        } else {
          console.warn("No user data found in the response");
        }
      } catch (error) {
        console.error("Error fetching current user data:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        "https://webspin-backend.onrender.com/api/users/edit",
        {
          walletAddress,
          emailAddress,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Include any necessary authentication headers here
            // 'Authorization': `Bearer ${yourAuthToken}`
          },
          withCredentials: true, // Ensure this is included
        }
      );
      console.log("API Response:", response.data); // Log the response data
      if (response.data && response.data.referredUsers) {
        setReferrals(response.data.referredUsers);
      } else {
        console.warn("No referred users found in the response");
      }
      setIsDialogOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000); // Clear the success message after 2 seconds
      })
      .catch(() => {
        setCopySuccess("Failed to copy!");
        setTimeout(() => setCopySuccess(""), 2000); // Clear the error message after 2 seconds
      });
  };

  return (
    <div className="App px-5 md:px-10 pt-11">
      <UserTable />

      {referralLink && (
        <div className="py-4">
          <p className=" mr-2 hidden">{referralLink}</p>
          <Button
            onClick={copyToClipboard}
            className=" bg-transparent text-black hover:text-white  px-3 py-1 rounded">
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
                Make changes to your profile here. Click save when you're done.
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
                  onChange={(e) => setWalletAddress(e.target.value)}
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
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSaveChanges}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {referrals.length > 0 ? (
        <ul>
          <h2>
            Referrals
            <Button className=" h-[40px] w-[40px] text-white rounded-full">
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
