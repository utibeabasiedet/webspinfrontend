'use client'
import React, { useEffect, useState } from 'react';
import UserTable from './columns'; // Adjust the import path as needed
import useStateManager from "@/statemanager/stateManager";

function App() {
  const { realuserId, isloggedin, referalCode } = useStateManager();
  const [referralLink, setReferralLink] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReferralLink(`${window.location.origin}/register?referralCode=${referalCode.get()}`);
    }
  }, [referalCode]);

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
      <h1>Referral Link</h1>
      {referralLink && (
        <div>
          <p className="inline mr-2">{referralLink}</p>
          <button onClick={copyToClipboard} className="bg-blue-500 text-white px-3 py-1 rounded">Copy</button>
          {copySuccess && <span className="ml-2 text-green-500">{copySuccess}</span>}
        </div>
      )}
    </div>
  );
}

export default App;
