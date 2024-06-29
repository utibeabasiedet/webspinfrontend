'use client'
import React, { useEffect, useState } from 'react';
import UserTable from './columns'; // Adjust the import path as needed
import useStateManager from "@/statemanager/stateManager";

function App() {
  const { realuserId, isloggedin, referalCode } = useStateManager();
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReferralLink(`${window.location.origin}/register?referralCode=${referalCode.get()}`);
    }
  }, [referalCode]);

  return (
    <div className="App px-5 md:px-10 pt-11">
      <UserTable />
      <h1>Referral Link</h1>
      {referralLink && <p>{referralLink}</p>}
    </div>
  );
}

export default App;
