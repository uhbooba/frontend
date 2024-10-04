type ErrorTextProps = {
  content: string;
};

const ErrorText: React.FC<ErrorTextProps> = ({ content }) => {
  return <p className='mt-2 text-base text-red-500'>{content}</p>;
};

export default ErrorText;
