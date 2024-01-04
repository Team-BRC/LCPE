import { useState, useEffect } from 'react';
import { signupFields } from "../components/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useRouter } from 'next/router';
import styles from "../app/Login.modules.css";

export default function Register(){
  const router = useRouter()
  const fields=signupFields;
  let fieldsState={};

  fields.forEach(field => fieldsState[field.id]='');
  const [signupState,setSignupState]=useState(fieldsState);
  const [loading, setLoading] = useState(false);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    createAccount()
    setLoading(true)
  }

  //handle Signup API Integration here
  const createAccount = async () =>{

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupState),
      });

      const result = await response.json();
      const status = await response.status

      if (status === 200) {
        sessionStorage.setItem("userExists", "true")
        sessionStorage.setItem("id", result.customer.id)
        router.push("/PaymentPage")
      }
      // Handle the result as needed
    } catch (error) {
      console.error('Error creating customer:', error);
      // Handle errors
    }  finally {
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
                          value={signupState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="Signup" />
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
      </div>
    </form>
  )
}