import { useEffect } from "react";
import { useRouter } from "next/router";
import Payment from "../components/Payment";

export default function PaymentPage() {
    const router = useRouter()
    useEffect(() => {
        const itemExists = sessionStorage.getItem("userExists") !== null;
        if (!itemExists) {
            router.push("/LoginPage")
        } else if (sessionStorage.getItem("userExists") === "false") {
            router.push("/LoginPage")
        } else if (sessionStorage.getItem("paymentExists") === "true") {
            router.push("/Landing")
        }
    }, []);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="font-bold mb-4">Secure Payment</h1>
            <p className="text-gray-600 mb-6">
                Thank you for choosing our services! Your payment information is securely processed to ensure a smooth experience.
            </p>
            <Payment />
        </div>
    )
}