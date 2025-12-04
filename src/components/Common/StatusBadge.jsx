import { getStatusColor, getStatusLabel } from '@/utils/helpers.js';

const StatusBadge = ({ status, isDropdown = false, onStatusChange }) => {
  const statusOptions = [
    { value: 'not_called', label: 'Not Called' },
    { value: 'attempted', label: 'Attempted' },
    { value: 'connected', label: 'Connected' },
  ];

  const interestOptions = [
    { value: 'rejected', label: 'Rejected' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
  ];

  const options = ['not_called', 'attempted', 'connected'].includes(status)
    ? statusOptions
    : interestOptions;

  if (isDropdown) {
    return (
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className={`px-3 py-1 rounded-full text-sm font-semibold border-0 cursor-pointer ${getStatusColor(status)}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
