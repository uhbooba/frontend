import React, { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='bg-black min-h-screen flex justify-center'>
      <div className='bg-white relative w-full max-w-[430px] h-full max-h-[950px] pb-[calc(56px+2rem)] overflow-y-auto'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
