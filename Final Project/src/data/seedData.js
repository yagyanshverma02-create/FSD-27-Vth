import { USER_ROLES, DONATION_STATUS, REQUEST_STATUS, FOOD_TYPES } from '../services/storageKeys';

export const SEED_USERS = [
  {
    id: 'user_donor_1',
    name: 'The Green Table Bistro',
    email: 'contact@greentable.org',
    role: USER_ROLES.DONOR,
    phone: '+1 (555) 234-5678',
    address: '428 Culinary Ave, Downtown District',
    coordinates: { latitude: 28.6189, longitude: 77.2140 },
    verified: true,
    bio: 'Farm-to-table bistro committed to zero organic waste.',
    createdAt: '2026-10-01T08:00:00.000Z'
  },
  {
    id: 'user_donor_2',
    name: 'Grand Orchard Banquets',
    email: 'chef@grandorchard.com',
    role: USER_ROLES.DONOR,
    phone: '+1 (555) 345-6789',
    address: '710 Grand Boulevard, Midtown',
    coordinates: { latitude: 28.6250, longitude: 77.2020 },
    verified: true,
    bio: 'Luxury event catering & hospitality banquet.',
    createdAt: '2026-10-15T09:30:00.000Z'
  },
  {
    id: 'user_ngo_1',
    name: 'FeedForward Community Relief',
    email: 'team@feedforward.ngo',
    role: USER_ROLES.NGO,
    phone: '+1 (555) 890-1234',
    address: '15 Hope St, East Community Hub',
    coordinates: { latitude: 28.6120, longitude: 77.2280 },
    verified: true,
    registrationNumber: 'NGO-DEL-89420',
    bio: 'Daily hot meal outreach program serving vulnerable youth & shelters.',
    createdAt: '2026-09-10T10:00:00.000Z'
  },
  {
    id: 'user_ngo_2',
    name: 'Nourish City Shelter',
    email: 'director@nourishcity.ngo',
    role: USER_ROLES.NGO,
    phone: '+1 (555) 901-2345',
    address: '88 Sanctuary Lane, South Quarter',
    coordinates: { latitude: 28.5980, longitude: 77.2180 },
    verified: true,
    registrationNumber: 'NGO-DEL-77319',
    bio: 'Providing emergency food security, temporary shelter and warm meals.',
    createdAt: '2026-09-20T11:00:00.000Z'
  }
];

// Helper to get dates relative to now so data is always fresh and expiry logic works dynamically
const getRelativeDate = (hoursFromNow) => {
  const date = new Date();
  date.setHours(date.getHours() + hoursFromNow);
  return date.toISOString();
};

export const SEED_DONATIONS = [
  {
    id: 'don_101',
    donorId: 'user_donor_1',
    donorName: 'The Green Table Bistro',
    donorPhone: '+1 (555) 234-5678',
    title: 'Warm Herb-Roasted Vegetable Medley & Basmati Pilaf',
    foodType: FOOD_TYPES.COOKED_MEALS,
    totalQuantity: 40,
    availableQuantity: 15,
    reservedQuantity: 25,
    unit: 'portions',
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    description: 'Freshly prepared from our lunch corporate catering surplus. Clean steam trays, packed in food-grade thermal containers.',
    storageCondition: 'Keep warm (>60°C) or refrigerate immediately upon arrival.',
    pickupAddress: '428 Culinary Ave, Downtown District',
    coordinates: { latitude: 28.6189, longitude: 77.2140 },
    preparedAt: getRelativeDate(-2),
    expiryTime: getRelativeDate(3), // 3 hours left -> Urgent
    status: DONATION_STATUS.AVAILABLE,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    createdAt: getRelativeDate(-2)
  },
  {
    id: 'don_102',
    donorId: 'user_donor_2',
    donorName: 'Grand Orchard Banquets',
    donorPhone: '+1 (555) 345-6789',
    title: 'Assorted Gourmet Artisan Sandwiches & Wraps',
    foodType: FOOD_TYPES.COOKED_MEALS,
    totalQuantity: 60,
    availableQuantity: 60,
    reservedQuantity: 0,
    unit: 'meals',
    dietaryTags: ['Vegetarian', 'Halal'],
    description: 'Freshly crafted banquet wraps: grilled paneer wraps, Mediterranean hummus and roasted pepper focaccia.',
    storageCondition: 'Chilled / Ambient. Best consumed within 6 hours.',
    pickupAddress: '710 Grand Boulevard, Midtown',
    coordinates: { latitude: 28.6250, longitude: 77.2020 },
    preparedAt: getRelativeDate(-1),
    expiryTime: getRelativeDate(8),
    status: DONATION_STATUS.AVAILABLE,
    imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    createdAt: getRelativeDate(-1)
  },
  {
    id: 'don_103',
    donorId: 'user_donor_1',
    donorName: 'The Green Table Bistro',
    donorPhone: '+1 (555) 234-5678',
    title: 'Artisan Sourdough Loaves & Morning Pastries',
    foodType: FOOD_TYPES.BAKERY,
    totalQuantity: 25,
    availableQuantity: 25,
    reservedQuantity: 0,
    unit: 'boxes',
    dietaryTags: ['Vegetarian'],
    description: 'Daily morning bake of rustic sourdough boules, pain au chocolat, and whole grain baguettes.',
    storageCondition: 'Dry ambient storage.',
    pickupAddress: '428 Culinary Ave, Downtown District',
    coordinates: { latitude: 28.6189, longitude: 77.2140 },
    preparedAt: getRelativeDate(-5),
    expiryTime: getRelativeDate(28),
    status: DONATION_STATUS.AVAILABLE,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    createdAt: getRelativeDate(-5)
  },
  {
    id: 'don_104',
    donorId: 'user_donor_2',
    donorName: 'Grand Orchard Banquets',
    donorPhone: '+1 (555) 345-6789',
    title: 'Crate of Ripe Organic Apples & Seasonal Citrus',
    foodType: FOOD_TYPES.PRODUCE,
    totalQuantity: 30,
    availableQuantity: 0,
    reservedQuantity: 30,
    unit: 'kg',
    dietaryTags: ['Vegan', 'Gluten-Free'],
    description: 'Unblemished fresh orchard fruits suitable for community kitchen distribution or immediate snack boxes.',
    storageCondition: 'Cool dry area.',
    pickupAddress: '710 Grand Boulevard, Midtown',
    coordinates: { latitude: 28.6250, longitude: 77.2020 },
    preparedAt: getRelativeDate(-10),
    expiryTime: getRelativeDate(48),
    status: DONATION_STATUS.RESERVED,
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
    createdAt: getRelativeDate(-10)
  }
];

export const SEED_REQUESTS = [
  {
    id: 'req_501',
    donationId: 'don_101',
    donationTitle: 'Warm Herb-Roasted Vegetable Medley & Basmati Pilaf',
    donorId: 'user_donor_1',
    donorName: 'The Green Table Bistro',
    ngoId: 'user_ngo_1',
    ngoName: 'FeedForward Community Relief',
    ngoPhone: '+1 (555) 890-1234',
    requestedQuantity: 25,
    unit: 'portions',
    status: REQUEST_STATUS.APPROVED,
    notes: 'We have our temperature-controlled collection van ready for 4:30 PM pickup.',
    collectionWindow: 'Today, 4:00 PM - 5:00 PM',
    createdAt: getRelativeDate(-1),
    updatedAt: getRelativeDate(-0.5)
  },
  {
    id: 'req_502',
    donationId: 'don_104',
    donationTitle: 'Crate of Ripe Organic Apples & Seasonal Citrus',
    donorId: 'user_donor_2',
    donorName: 'Grand Orchard Banquets',
    ngoId: 'user_ngo_2',
    ngoName: 'Nourish City Shelter',
    ngoPhone: '+1 (555) 901-2345',
    requestedQuantity: 30,
    unit: 'kg',
    status: REQUEST_STATUS.PENDING,
    notes: 'Requested for our evening shelter youth dining program.',
    collectionWindow: 'Tomorrow morning, 9:00 AM - 10:30 AM',
    createdAt: getRelativeDate(-3),
    updatedAt: getRelativeDate(-3)
  }
];

export const SEED_NOTIFICATIONS = [
  {
    id: 'notif_1',
    userId: 'user_donor_1',
    title: 'New Pickup Request',
    message: 'FeedForward Community Relief requested 25 portions of Warm Herb-Roasted Vegetable Medley.',
    type: 'request',
    read: false,
    createdAt: getRelativeDate(-1)
  },
  {
    id: 'notif_2',
    userId: 'user_ngo_1',
    title: 'Request Approved!',
    message: 'The Green Table Bistro approved your request for 25 portions. Please coordinate pickup.',
    type: 'approval',
    read: true,
    createdAt: getRelativeDate(-0.5)
  }
];
