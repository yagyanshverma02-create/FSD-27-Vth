export const generateId = (prefix = 'id') => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`;
};

export const getIsoTimestamp = () => new Date().toISOString();

export const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const getExpiryStatus = (expiryIsoString) => {
  if (!expiryIsoString) return { status: 'unknown', text: 'No expiry info', isExpired: false, isUrgent: false };
  
  const now = new Date();
  const expiry = new Date(expiryIsoString);
  const diffMs = expiry - now;

  if (diffMs <= 0) {
    return {
      status: 'expired',
      text: 'Expired',
      isExpired: true,
      isUrgent: false,
      color: 'var(--color-status-expired)',
      bg: 'var(--color-status-expired-bg)'
    };
  }

  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 4) {
    const hoursLeft = Math.floor(diffHours);
    const minsLeft = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const timeText = hoursLeft > 0 ? `${hoursLeft}h ${minsLeft}m left` : `${minsLeft}m left`;
    return {
      status: 'urgent',
      text: `Urgent: ${timeText}`,
      isExpired: false,
      isUrgent: true,
      color: 'var(--color-status-cancelled)',
      bg: 'var(--color-status-cancelled-bg)'
    };
  }

  if (diffHours < 24) {
    return {
      status: 'warning',
      text: `Expires in ${Math.round(diffHours)} hours`,
      isExpired: false,
      isUrgent: false,
      color: 'var(--color-status-pending)',
      bg: 'var(--color-status-pending-bg)'
    };
  }

  const daysLeft = Math.floor(diffHours / 24);
  return {
    status: 'good',
    text: `Valid for ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}`,
    isExpired: false,
    isUrgent: false,
    color: 'var(--color-status-approved)',
    bg: 'var(--color-status-approved-bg)'
  };
};
