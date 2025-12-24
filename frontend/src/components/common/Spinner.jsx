import { LuLoader2 } from 'react-icons/lu';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <LuLoader2 className={`${sizes[size]} animate-spin text-primary-600`} />
    </div>
  );
};

export default Spinner;
