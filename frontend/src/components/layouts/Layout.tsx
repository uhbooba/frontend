import React, { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex h-[100vh] justify-center'>
      <div className='relative h-full w-full max-w-[430px] overflow-hidden bg-white'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
