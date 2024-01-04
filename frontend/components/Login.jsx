import { useState } from 'react';
import { loginFields } from "../components/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { useRouter } from 'next/router';
import styles from "../app/Login.modules.css";

export default function Login(){
    const router = useRouter()

    const fields = loginFields;
    let fieldsState = {};
    fields.forEach(field=>fieldsState[field.id]='');
    const [loginState,setLoginState]=useState(fieldsState);
    const [loading, setLoading] = useState(false);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
        setLoading(true);
    }

    //Handle Login API Integration here
    const authenticateUser = async () =>{

        try {
            const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginState),
            });
            
            const status = await response.status;
            const result = await response.json();
            if (status === 200){
                sessionStorage.setItem("userExists", "true")
                sessionStorage.setItem("paymentExists", "true")
                sessionStorage.setItem("id", result.id) 
                router.push("/Landing")
            } else if (status == 203) {
                alert("Incorrect password. Try again!")
            }else if (status === 401) {
                alert("Try again! " + result.success + ". Click on the signup link below.")
            } else if (status === 400) {
                alert("Your subscription of 6 months has expired or you haven't paid yet. Click OK on the alert which will redirect you to the payment page.")
                sessionStorage.setItem("userExists", "true")
                sessionStorage.setItem("paymentExists", "false")
                sessionStorage.setItem("id", result.id)
                router.push("/PaymentPage")
            }
            // Handle the result as needed
          } catch (error) {
            console.error('Error creating customer:', error);
            // Handle errors
          } finally {
            setLoading(false);
        }
        
    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
                {
                    fields.map(field=>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                        />
                    
                    )
                }
            </div>
            <FormAction handleSubmit={handleSubmit} text="Login"/>
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                    <div className={styles.spinner} style={{
                        border: '6px solid rgba(0, 0, 0, 0.1)',
                        borderLeft: '6px solid #3498db',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                </div>
            )}
      </form>
    )
}