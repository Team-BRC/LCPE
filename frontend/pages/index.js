import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page
    router.push('/LoginPage');
  }, []);

  // Return an empty component or a loading indicator if needed
  return null;
};

export default IndexPage;
