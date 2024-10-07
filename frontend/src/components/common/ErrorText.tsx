import clsx from 'clsx';

type ErrorTextProps = {
  children: React.ReactNode;
  color?: 'red' | 'green';
};

const ErrorText: React.FC<ErrorTextProps> = ({ children, color = 'red' }) => {
  return (
    <p
      className={clsx([
        'mt-2 text-base',
        color === 'red' ? 'text-red-main' : 'text-green-main',
      ])}
    >
      {children}
    </p>
  );
};

export default ErrorText;
