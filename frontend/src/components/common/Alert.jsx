import { LuAlertCircle, LuCheckCircle, LuInfo, LuAlertTriangle, LuX } from 'react-icons/lu';

const Alert = ({ type = 'info', title, message, onClose, className = '' }) => {
  const types = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: LuInfo
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: LuCheckCircle
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: LuAlertTriangle
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: LuAlertCircle
    }
  };

  const config = types[type] || types.info;
  const Icon = config.icon;

  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <Icon className={`${config.text} w-5 h-5 mr-3 flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          {title && <h4 className={`${config.text} font-medium mb-1`}>{title}</h4>}
          {message && <p className={`${config.text} text-sm`}>{message}</p>}
        </div>
        {onClose && (
          <button onClick={onClose} className={`${config.text} hover:opacity-70 ml-3`}>
            <LuX className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
