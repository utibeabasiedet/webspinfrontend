"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import axios from "axios";
import { FaEye, FaEyeLowVision } from "react-icons/fa6";
import { useToast } from "@/components/ui/use-toast";
import Button from "@/components/CustomButton";
import useStateManager from "@/statemanager/stateManager";

const validationSchema = z.object({
  walletAddress: z.string().min(1, "Wallet address is required"),
  emailAddress: z.string().email({ message: "Email address is invalid." }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long." }),
  referralCode: z.string().optional(),
});

type FormData = z.infer<typeof validationSchema>;

const Register: React.FC = () => {
  const { isloggedin } = useStateManager();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCodeFromUrl = searchParams.get("referralCode");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [showIndicators, setShowIndicators] = useState(false);
  const [fulfilledCriteria, setFulfilledCriteriaCount] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (referralCodeFromUrl) {
      setValue("referralCode", referralCodeFromUrl);
    }
  }, [referralCodeFromUrl, setValue]);

  const registerUser = async (userData: FormData) => {
    try {
      const response = await axios.post(
        "https://webspin-backend.onrender.com/api/users/register",
        userData,
        {
          withCredentials: true,
        }
      );

      console.log("User registered successfully:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error registering user:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };

  const onSubmitForm = async (account: FormData) => {
    setIsLoading(true);
    try {
      const data = await registerUser(account);
      isloggedin.set(true);

      toast({
        title: "Congratulations",
        description: "You signed up successfully",
      });
      router.push("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response?.data?.message || error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowIndicators(true);
    const newPassword = e.target.value;

    const indicators = {
      capitalLetter: /[A-Z]/.test(newPassword),
      length: newPassword.length >= 8,
      number: /\d/.test(newPassword),
      specialCharacter: /[@$%*~^!]/.test(newPassword),
    };

    const fulfilledCriteriaCount =
      Object.values(indicators).filter(Boolean).length;

    setFulfilledCriteriaCount(fulfilledCriteriaCount);
  };

  return (
    <section className="flex w-full justify-center">
      <div className="flex w-[100%] px-6 relative lg:w-[50vw] flex-col items-center py-[38px] mb-[50px] sm:mb-[1px]">
        <h2 className="text-primary text-[36px] items-start w-[100%] sm:w-[404px] font-medium">
          Sign up
        </h2>
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="flex flex-col w-[100%] sm:w-[404px] relative gap-4 mt-[38px]"
        >
          <div className="flex flex-col gap-[6px]">
            <label htmlFor="walletAddress">Wallet Address</label>
            <input
              className="border outline-blue-700 w-full h-[48px] rounded-lg px-[14px]"
              type="text"
              placeholder="Enter Wallet Address"
              {...register("walletAddress")}
            />
            <span className="text-red-500 text-sm font-semibold">
              {errors.walletAddress && errors.walletAddress.message}
            </span>
          </div>

          <div className="flex flex-col gap-[6px]">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              className="border outline-blue-700 w-full h-[48px] rounded-lg px-[14px]"
              type="text"
              placeholder="Enter Email Address"
              {...register("emailAddress")}
            />
            <span className="text-red-500 text-sm font-semibold">
              {errors.emailAddress && errors.emailAddress.message}
            </span>
          </div>

          <div className="flex flex-col relative gap-[6px]">
            <label htmlFor="password">Password</label>
            <input
              className="border outline-blue-700 w-full h-[48px] rounded-lg px-[14px]"
              type={passwordShow ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              onChange={handlePasswordChange}
            />
            <div
              className="absolute top-[44px] right-2 cursor-pointer"
              onClick={togglePassword}
            >
              {passwordShow ? <FaEyeLowVision /> : <FaEye />}
            </div>
            <span className="text-red-500 text-sm font-semibold">
              {errors.password && errors.password.message}
            </span>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label htmlFor="referralCode">Referral Code</label>
            <input
              className="border outline-blue-700 w-full h-[48px] rounded-lg px-[14px]"
              type="text"
              placeholder="Referral Code"
              {...register("referralCode")}
            />
          </div>

          <Button
            btnType="submit"
            title={"Sign up"}
            isDisabled={isLoading}
            handleClick={handleSubmit(onSubmitForm)}
            containerStyles="mt-4"
          />
        </form>

        <p className="w-full text-center mt-[24px]">
          Already have an account?{" "}
          <span className="text-primary">
            <Link href="/login">Sign-in</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

const RegisterPage: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Register />
  </Suspense>
);

export default RegisterPage;
