export const SCHEMA_VERSION = '1.0.0';

export const STORAGE_KEYS = {
  SCHEMA_VERSION: 'mealbridge_schema_version',
  USERS: 'mealbridge_users',
  CURRENT_USER: 'mealbridge_current_user',
  DONATIONS: 'mealbridge_donations',
  REQUESTS: 'mealbridge_requests',
  NOTIFICATIONS: 'mealbridge_notifications',
  FEEDBACK: 'mealbridge_feedback',
};

export const USER_ROLES = {
  DONOR: 'donor',
  NGO: 'ngo',
};

export const DONATION_STATUS = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  FULLY_CLAIMED: 'fully_claimed',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
};

export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const FOOD_TYPES = {
  COOKED_MEALS: 'Cooked Meals',
  BAKERY: 'Bakery & Bread',
  PRODUCE: 'Fresh Produce',
  PACKAGED: 'Packaged & Canned',
  DAIRY: 'Dairy & Refrigerated',
};
