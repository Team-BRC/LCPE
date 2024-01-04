// components/Layout.js
import Link from 'next/link';
import { Menu, Button } from 'semantic-ui-react';

const Layout = ({ children }) => {
  return (
    <>
      <main className="container mx-auto my-4">
        <div className='flex flex-col md:flex-row items-center justify-around p-2 md:p-4'>
            <Link href="/Logout">
            <Menu.Item>
                <Button className='text-white' primary>Logout</Button>
            </Menu.Item>
            </Link>
            <Link href="/Landing">
            <Menu.Item>
                <Button className='text-white' primary>Landing Page</Button>
            </Menu.Item>
            </Link>
        </div>
        {children}
      </main>
    </>
  );
};

export default Layout;
