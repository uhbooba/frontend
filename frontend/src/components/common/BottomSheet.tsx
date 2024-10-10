import React from 'react';

type BottomSheetProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 left-1/2 z-50 flex w-full -translate-x-1/2 transform items-end justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='w-full max-w-md transform space-y-4 rounded-t-3xl bg-white p-6 transition-transform duration-300 ease-out'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='space-y-4'>{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;
