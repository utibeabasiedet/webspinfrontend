'use client';
import React, { useEffect, useState } from 'react';
import UserTable from './columns'; // Adjust the import path as needed
import useStateManager from "@/statemanager/stateManager";
import axios from 'axios'; // Import axios to make API requests

// Define a type for the referral data
interface Referral {
  email: string;
  points: number;
}

function App() {
  const { realuserId, isloggedin, referalCode } = useStateManager();
  const [referralLink, setReferralLink] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [referrals, setReferrals] = useState<Referral[]>([]); // Use the defined type for state

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReferralLink(`${window.location.origin}/register?referralCode=${referalCode.get()}`);
    }
  }, [referalCode]);

  useEffect(() => {
    // Fetch referral data from the backend
    const fetchReferrals = async () => {
      try {
        const response = await axios.get('https://webspin-backend.onrender.com/api/users/referred-users', {
          headers: {
            'Content-Type': 'application/json',
            // Include any necessary authentication headers here
            // 'Authorization': `Bearer ${yourAuthToken}`
          },
          withCredentials: true, // Ensure this is included
        });
        console.log('API Response:', response.data); // Log the response data
        if (response.data && response.data.referredUsers) {
          setReferrals(response.data.referredUsers);
        } else {
          console.warn('No referred users found in the response');
        }
      } catch (error) {
        console.error('Error fetching referrals:', error);
      }
    };

    fetchReferrals();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000); // Clear the success message after 2 seconds
    }).catch(() => {
      setCopySuccess('Failed to copy!');
      setTimeout(() => setCopySuccess(''), 2000); // Clear the error message after 2 seconds
    });
  };

  return (
    <div className="App px-5 md:px-10 pt-11">
      <UserTable />
     
      {referralLink && (
        <div className='py-4'>
          <p className=" mr-2 hidden">{referralLink}</p>
          <button onClick={copyToClipboard} className="bg-blue-500 text-white px-3 py-1 rounded">Copy Referral Link</button>
          {copySuccess && <span className="ml-2 text-green-500">{copySuccess}</span>}
        </div>
      )}
      
      {referrals.length > 0 ? (
        <ul>
          {
            // <li className='bg-gray-50 py-2 shadow-sm border-b' key={referral.email}>
            //  {/* <span className='font-bold'>Email:</span>  {referral.email} - <span className='font-bold'>Point gained: </span>{referral.points} */}
            // </li>
            <h2>Referrals <button className='bg-blue-500 h-[40px] w-[40px] text-white rounded-full'>{referrals.length} </button> </h2>
         }
        </ul>
      ) : (
        <p>No referrals yet.</p>
      )}
    </div>
  );
}

export default App;
