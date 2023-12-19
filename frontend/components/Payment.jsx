import { useRouter } from 'next/router';
import { PaymentForm, CreditCard} from 'react-square-web-payments-sdk';

export default function Payment() {
    const router = useRouter()
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <PaymentForm
                    applicationId="sandbox-sq0idb-6Y2imhEa961HPIPo9b0Yhw"
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
                        if (paymentResponse.payment.status === 'COMPLETED') {
                            sessionStorage.setItem("paymentExists", "true")
                            router.push("/Landing")
                        } else {
                            alert('Payment did not go through')
                        }
                    }}
                    locationId='LJ0ZSMQ2RBDCV'
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
        </div>
    )
}