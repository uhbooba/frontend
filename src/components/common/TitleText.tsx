import clsx from 'clsx';

type TitleTextProps = {
  children: React.ReactNode;
  className?: string;
};

const TitleText: React.FC<TitleTextProps> = ({ children, className }) => {
  return (
    <p className={clsx(['my-4 text-4xl font-bold', className])}>{children}</p>
  );
};

export default TitleText;
