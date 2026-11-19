export const validateDonation = (data) => {
  const errors = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  }
  if (!data.foodType) {
    errors.foodType = 'Please select a food category.';
  }
  if (!data.quantity || Number(data.quantity) <= 0) {
    errors.quantity = 'Quantity must be greater than zero.';
  }
  if (!data.unit) {
    errors.unit = 'Please specify a unit.';
  }
  if (!data.expiryTime) {
    errors.expiryTime = 'Expiry date and time is required.';
  } else if (new Date(data.expiryTime) <= new Date()) {
    errors.expiryTime = 'Expiry time must be in the future.';
  }
  if (!data.pickupAddress || data.pickupAddress.trim().length < 5) {
    errors.pickupAddress = 'Valid pickup address is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRequest = (donation, requestedQuantity) => {
  const errors = {};
  const qty = Number(requestedQuantity);

  if (!qty || qty <= 0) {
    errors.quantity = 'Requested quantity must be at least 1.';
  } else if (qty > (donation.availableQuantity ?? donation.quantity)) {
    errors.quantity = `Requested quantity exceeds available stock (${donation.availableQuantity ?? donation.quantity} ${donation.unit}).`;
  }

  const { isExpired } = donation.expiryTime ? new Date(donation.expiryTime) <= new Date() : false;
  if (isExpired) {
    errors.general = 'This food listing has already expired.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
