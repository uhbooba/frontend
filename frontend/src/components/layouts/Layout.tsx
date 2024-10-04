import React, { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex min-h-screen justify-center'>
      <div className='relative h-full max-h-[950px] w-full max-w-[430px] overflow-y-auto bg-white pb-[calc(56px+2rem)]'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
