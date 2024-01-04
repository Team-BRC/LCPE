import { useRouter } from 'next/router';
import { PaymentForm, CreditCard} from 'react-square-web-payments-sdk';

export default function Payment() {
    const router = useRouter()
    const squareappid = process.env.NEXT_PUBLIC_APP_ID
    const squarelocationid = process.env.NEXT_PUBLIC_LOCATION_ID
    return (
        <div className="text-center">
            <PaymentForm
                applicationId={squareappid}
                cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                    const response = await fetch("/api/pay", {
                        method: "POST",
                        headers: {
                        "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                        sourceId: token.token,
                        customerId: sessionStorage.getItem("id")
                        }),
                    });
                    const paymentResponse = await response.json();
                    console.log(paymentResponse);
                    if (paymentResponse.payment.status === 'COMPLETED') {
                        sessionStorage.setItem("paymentExists", "true")
                        router.push("/Landing")
                    } else {
                        alert('Payment did not go through')
                    }
                }}
                locationId={squarelocationid}
            >
                <CreditCard
                    buttonProps={{
                        css: {
                        backgroundColor: "#771520",
                        fontSize: "14px",
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "#530f16",
                        },
                        },
                    }}
                />
            </PaymentForm>
        </div>
    )
}