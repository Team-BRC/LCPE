// pages/logout.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Implement your logout logic here, e.g., clearing session, cookies, etc.
    // After logout, redirect to the home page
    sessionStorage.removeItem("userExists")
    sessionStorage.removeItem("paymentExists")
    router.push('/LoginPage');
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
