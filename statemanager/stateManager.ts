import { hookstate, useHookstate } from "@hookstate/core";

interface StateManager {
  realuserId: string;
  isloggedin: boolean;
  emailAddress: string;
  applicationName: string;
  rechargeStep: number;
  passwordReset:boolean;
  paymentRef: string;
  recharge: {
    stateDisco: string;
    customerAddress: string;
    customerEmail: string;
    customerMeterNumber: string;
    customerName: string;
    customerPhone: string;
    customerNumber: string;
    stateID: string;
    ibcName: string;
    amount: number;
    serviceCharge: number;
    paymentKey: string;
    splitCode: string;
  };
  auth:{
    resetCode:string;
  }
  stateRechargeDetails: {
    token: string;
    paymentId: string;
  };
}

const state = hookstate<StateManager>({
  applicationName: "MPG COIN",
  realuserId:"",
  isloggedin: false,
  emailAddress: "",
  rechargeStep: 1,
  paymentRef: "",
  passwordReset:true,
  recharge: {
    stateDisco: "",
    customerAddress: "",
    customerEmail: "",
    customerMeterNumber: "",
    customerNumber: "",
    stateID: "",
    customerName: "",
    customerPhone: "",
    ibcName: "",
    amount: 0,
    serviceCharge: 0,
    paymentKey: "",
    splitCode: "",
  },
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
