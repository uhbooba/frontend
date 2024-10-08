import React, { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex h-[calc(var(--vh,1vh)*100)] justify-center'>
      <div className='relative h-full max-h-[950px] w-full max-w-[430px] overflow-y-auto bg-white'>
        <div className='h-full overflow-y-auto pb-[5rem] pt-[5rem]'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
