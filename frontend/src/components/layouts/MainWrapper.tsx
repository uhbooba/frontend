import clsx from 'clsx';
import { ReactNode } from 'react';

interface MainWrapperProps {
  children?: ReactNode;
  className?: string;
}

const MainWrapper: React.FC<MainWrapperProps> = ({ children, className }) => {
  return (
    <div className={clsx(['w-full px-4 py-3', className])}>{children}</div>
  );
};

export default MainWrapper;
