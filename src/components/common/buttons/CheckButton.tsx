import React, { useState } from 'react';

const CheckButton = () => {
  const [selected, setSelected] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  return (
    <div className='ml-4 flex items-center space-x-4'>
      <label className='flex items-center space-x-2'>
        <input
          type='radio'
          name='yes or no'
          value='yes'
          checked={selected === 'yes'}
          onChange={handleChange}
          className='form-radio h-5 w-5'
        />
        <span>네</span>
      </label>
      <label className='flex items-center space-x-2'>
        <input
          type='radio'
          name='yes or no'
          value='no'
          checked={selected === 'no'}
          onChange={handleChange}
          className='form-radio h-5 w-5'
        />
        <span>아니오</span>
      </label>
    </div>
  );
};

export default CheckButton;
