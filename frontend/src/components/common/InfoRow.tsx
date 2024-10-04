import React from 'react';

type InfoRowProps = {
  title: string;
  content: string;
};

const InfoRow: React.FC<InfoRowProps> = ({ title, content }) => {
  return (
    <div className="mt-4">
      <div className="block text-xl font-bold text-gray-600">{title}</div>
      <div className="w-full min-h-14 flex items-center border-b border-gray-300 bg-white text-black outline-none focus:border-orange-300">
        <div className='ml-2 text-xl'>{content}</div>
      </div>
    </div>
  );
};

export default InfoRow;