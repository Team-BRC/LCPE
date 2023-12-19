import { useState, useEffect } from 'react';
import { signupFields } from "../components/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useRouter } from 'next/router';

export default function Register(){
  const router = useRouter()
  const fields=signupFields;
  let fieldsState={};

  fields.forEach(field => fieldsState[field.id]='');
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    createAccount()
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
      </div>

        

    </form>
  )
}