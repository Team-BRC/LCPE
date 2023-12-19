// components/Layout.js
import Link from 'next/link';
import {Menu, Button} from 'semantic-ui-react';

const Layout = ({ children }) => {
  return (
    <>
        <div className='flex flex-col md:flex-row items-center justify-around bg-500 p-2 md:p-4 '>
            <Link href="/Logout">
                <Menu.Item>
                    <Button className='color: #688f17' primary>Logout</Button>
                </Menu.Item>
            </Link>
            <Link href="/Landing">
                <Menu.Item>
                    <Button className='color: #688f17' primary>Landing Page</Button>
                </Menu.Item>
            </Link>
        </div>
        <main>{children}</main>
    </>
  );
};

export default Layout;
