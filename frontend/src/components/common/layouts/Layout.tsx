import React, { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex min-h-screen justify-center bg-gray-100'>
      <div className='w-full max-w-screen-lg px-4'>{children}</div>
    </div>
  );
};

export default Layout;
