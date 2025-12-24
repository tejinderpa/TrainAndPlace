import { getInitials } from '@/utils/helpers';

const Avatar = ({ firstName, lastName, src, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  const initials = getInitials(firstName, lastName);

  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center font-medium ${className}`}>
      {src ? (
        <img src={src} alt={`${firstName} ${lastName}`} className="w-full h-full rounded-full object-cover" />
      ) : (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white">
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;
