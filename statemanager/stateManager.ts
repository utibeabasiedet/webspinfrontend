import { hookstate, useHookstate } from "@hookstate/core";

interface StateManager {
  realuserId: string;
  isloggedin: boolean;
  emailAddress: string;
  applicationName: string;
  rechargeStep: number;
  passwordReset:boolean;
  referalCode: string;
  
  auth:{
    resetCode:string;
  }
  stateRechargeDetails: {
    token: string;
    paymentId: string;
  };
}

const state = hookstate<StateManager>({
  applicationName: "MPG TOKEN",
  realuserId:"",
  isloggedin: false,
  emailAddress: "",
  rechargeStep: 1,
  referalCode: "",
  passwordReset:true,
  
  auth:{
    resetCode: ''
  },
  stateRechargeDetails: {
    token: "",
    paymentId: "",
  },
});

export default function useStateManager() {
  return useHookstate(state);
}
