import clsx from 'clsx';
import { ReactNode } from 'react';

interface MainWrapperProps {
  children?: ReactNode;
  className?: string;
  isBottomTab?: boolean;
}

const MainWrapper: React.FC<MainWrapperProps> = ({
  children,
  className,
  isBottomTab = false,
}) => {
  return (
    <div
      className={clsx([
        'flex flex-col overflow-y-auto',
        isBottomTab ? 'h-[calc(100vh-5rem-5rem)]' : 'h-[calc(100vh-5rem)]',
        'mt-20',
        className,
      ])}
    >
      <div className='mx-4 my-3'>{children}</div>
    </div>
  );
};

export default MainWrapper;
