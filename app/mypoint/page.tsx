'use client'
import React from 'react';
import UserTable from './columns'; // Adjust the import path as needed
import  useStateManager  from "@/statemanager/stateManager";

function App() {
  const { realuserId, isloggedin,referalCode } = useStateManager();
  return (
    <div className="App px-5 md:px-10 pt-11">
      <UserTable />
      <h1>referal link</h1>
      
  const referralLink = `${window.location.origin}/register?referralCode=${referalCode.get()}`; 
    </div>
  );
}

export default App;
