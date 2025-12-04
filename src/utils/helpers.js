export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
};

export const getStatusColor = (status) => {
  const colors = {
    done: 'bg-green-100 text-green-800',
    'on-progress': 'bg-yellow-100 text-yellow-800',
    'on_progress': 'bg-yellow-100 text-yellow-800',
    undone: 'bg-red-100 text-red-800',
    approved: 'bg-green-100 text-green-800',
    'on-hold': 'bg-yellow-100 text-yellow-800',
    'on_hold': 'bg-yellow-100 text-yellow-800',
    declined: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusLabel = (status) => {
  const labels = {
    done: 'Done',
    'on-progress': 'In Progress',
    'on_progress': 'In Progress',
    undone: 'Pending',
    approved: 'Approved',
    'on-hold': 'On Hold',
    'on_hold': 'On Hold',
    declined: 'Declined',
  };
  return labels[status] || status;
};
