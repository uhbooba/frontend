import React, { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='bg-black'>
      <div className='bg-white max-w-[360px] mx-auto h-[calc(100vh-108px)] pb-[calc(56px+2rem)] overflow-hidden bg-gray'>
          {children}
      </div>
    </div> 
  );
};

export default Layout;
