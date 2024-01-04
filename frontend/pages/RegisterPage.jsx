import Header from "../components/Header";
import Register from "../components/Register";
import { useRouter } from "next/router";
import React, {useEffect } from "react";

export default function RegisterForm(){
    const router = useRouter()
    useEffect(() => {
        const itemExists = sessionStorage.getItem("userExists") !== null && sessionStorage.getItem("userExists") === "true" && sessionStorage.getItem("paymentExists") === "false";
        const paymentExists = sessionStorage.getItem("paymentExists") !== null && sessionStorage.getItem("paymentExists") === "false";
        if (sessionStorage.getItem("userExists") === "false") {
            router.push("/LoginPage")
        } else if (sessionStorage.getItem("userExists") === "true" && paymentExists) {
            router.push("/PaymentPage")
        } else if (sessionStorage.getItem("paymentExists") === "true") {
            router.push("/Landing")
        }
    }, []);
    return(
        <>
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/LoginPage"
            />
            <Register/>
        </>
    )
}
