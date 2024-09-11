import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='min-h-screen bg-gray-100 flex justify-center'>
            <div className='w-full max-w-screen-md px-4'>
                {children}
            </div>
        </div>
    )
}


export default Layout;