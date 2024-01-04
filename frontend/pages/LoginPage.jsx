import Login from "../components/Login";
import Header from '../components/Header';
import { useRouter } from 'next/router'; // Import useRouter from Next.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const router = useRouter(); // Use the useRouter hook for navigation

  useEffect(() => {
    const itemExists = sessionStorage.getItem("userExists") !== null && sessionStorage.getItem("userExists") === "true";
    const paymentExists = sessionStorage.getItem("paymentExists") !== null && sessionStorage.getItem("paymentExists") === "false";
    if (itemExists && paymentExists) {
        router.push("/PaymentPage")
    } else if (sessionStorage.getItem("paymentExists") === "true") {
        router.push("/Landing")
    }
  }, []);

  return (
    <>
    <div>
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/RegisterPage"
      />
      <Login />
    </div>
    </>
  );
};

export default LoginForm;
