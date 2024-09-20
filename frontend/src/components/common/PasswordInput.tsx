import { useState, useEffect } from 'react';

interface PasswordInputProps {
  onComplete: (password: string[]) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onComplete }) => {
  const [password, setPassword] = useState<string[]>([]);

  const numberClick = (num: string) => {
    if (password.length < 6) {
      setPassword([...password, num]);
    }
  };

  const deleteNumber = () => {
    setPassword(password.slice(0, -1));
  };

  useEffect(() => {
    if (password.length === 6) {
      onComplete(password);
    }
  }, [password, onComplete]);

  return (
    <div>
      <div className='mb-2 mt-20 flex justify-center'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className='mx-2 flex h-12 w-12 items-center justify-center border-b-2 border-gray-300 text-2xl font-bold'
          >
            {password[index] ? '*' : ''}
          </div>
        ))}
      </div>

      <div className='mb-8 grid grid-cols-3 gap-4 text-center font-bold'>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '←'].map(
          (num, index) => (
            <button
              key={index}
              className={`bg-transparent p-4 text-5xl ${
                num === '' ? 'pointer-events-none' : ''
              }`}
              onClick={() => {
                if (num === '←') {
                  deleteNumber();
                } else if (num !== '') {
                  numberClick(num);
                }
              }}
            >
              {num}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
