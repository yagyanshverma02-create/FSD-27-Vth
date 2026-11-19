import { STORAGE_KEYS, SCHEMA_VERSION, DONATION_STATUS, REQUEST_STATUS } from './storageKeys';
import { SEED_USERS, SEED_DONATIONS, SEED_REQUESTS, SEED_NOTIFICATIONS } from '../data/seedData';
import { generateId, getIsoTimestamp } from '../utils/formatters';

class LocalStorageService {
  constructor() {
    this.initialize();
  }

  /**
   * Initializes local storage with schema versioning and seed data if not present
   */
  initialize() {
    try {
      const currentVersion = this.getItem(STORAGE_KEYS.SCHEMA_VERSION);
      if (currentVersion !== SCHEMA_VERSION) {
        // First run or version upgrade: seed the data
        this.setItem(STORAGE_KEYS.SCHEMA_VERSION, SCHEMA_VERSION);
        if (!this.getItem(STORAGE_KEYS.USERS)) {
          this.setItem(STORAGE_KEYS.USERS, SEED_USERS);
        }
        if (!this.getItem(STORAGE_KEYS.DONATIONS)) {
          this.setItem(STORAGE_KEYS.DONATIONS, SEED_DONATIONS);
        }
        if (!this.getItem(STORAGE_KEYS.REQUESTS)) {
          this.setItem(STORAGE_KEYS.REQUESTS, SEED_REQUESTS);
        }
        if (!this.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
          this.setItem(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
        }
        // Default logged-in user to the first donor for immediate review
        if (!this.getItem(STORAGE_KEYS.CURRENT_USER)) {
          this.setItem(STORAGE_KEYS.CURRENT_USER, SEED_USERS[0]);
        }
      }
    } catch (err) {
      console.error('LocalStorageService initialization error:', err);
    }
  }

  getItem(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error(`Error reading key "${key}" from localStorage:`, err);
      return null;
    }
  }

  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`Error writing key "${key}" to localStorage:`, err);
      return false;
    }
  }

  // --- Auth / User Management ---
  getCurrentUser() {
    return this.getItem(STORAGE_KEYS.CURRENT_USER);
  }

  setCurrentUser(user) {
    return this.setItem(STORAGE_KEYS.CURRENT_USER, user);
  }

  getUsers() {
    return this.getItem(STORAGE_KEYS.USERS) || [];
  }

  getUserById(id) {
    const users = this.getUsers();
    return users.find((u) => u.id === id) || null;
  }

  registerUser(userData) {
    const users = this.getUsers();
    const newUser = {
      ...userData,
      id: generateId('user'),
      verified: true,
      createdAt: getIsoTimestamp()
    };
    users.push(newUser);
    this.setItem(STORAGE_KEYS.USERS, users);
    this.setCurrentUser(newUser);
    return newUser;
  }

  // --- Donations CRUD ---
  getDonations() {
    const donations = this.getItem(STORAGE_KEYS.DONATIONS) || [];
    // Dynamic expiry evaluation
    const now = new Date();
    return donations.map((d) => {
      if (d.status === DONATION_STATUS.AVAILABLE && d.expiryTime && new Date(d.expiryTime) <= now) {
        return { ...d, status: DONATION_STATUS.EXPIRED };
      }
      return d;
    });
  }

  getDonationById(id) {
    const donations = this.getDonations();
    return donations.find((d) => d.id === id) || null;
  }

  createDonation(donationData) {
    const donations = this.getDonations();
    const totalQty = Number(donationData.totalQuantity || donationData.quantity);
    const newDonation = {
      ...donationData,
      id: generateId('don'),
      totalQuantity: totalQty,
      availableQuantity: totalQty,
      reservedQuantity: 0,
      status: DONATION_STATUS.AVAILABLE,
      createdAt: getIsoTimestamp(),
      updatedAt: getIsoTimestamp()
    };
    donations.unshift(newDonation);
    this.setItem(STORAGE_KEYS.DONATIONS, donations);
    return newDonation;
  }

  updateDonation(id, updates) {
    const donations = this.getDonations();
    const index = donations.findIndex((d) => d.id === id);
    if (index === -1) return null;

    donations[index] = {
      ...donations[index],
      ...updates,
      updatedAt: getIsoTimestamp()
    };
    this.setItem(STORAGE_KEYS.DONATIONS, donations);
    return donations[index];
  }

  deleteDonation(id) {
    const donations = this.getDonations();
    const filtered = donations.filter((d) => d.id !== id);
    this.setItem(STORAGE_KEYS.DONATIONS, filtered);
    return true;
  }

  // --- Safe Quantity Reservation & Requests ---
  getRequests() {
    return this.getItem(STORAGE_KEYS.REQUESTS) || [];
  }

  createRequest({ donationId, ngoUser, requestedQuantity, notes, collectionWindow }) {
    const donations = this.getDonations();
    const donationIndex = donations.findIndex((d) => d.id === donationId);
    if (donationIndex === -1) throw new Error('Donation not found');

    const donation = donations[donationIndex];
    const qty = Number(requestedQuantity);

    if (qty > donation.availableQuantity) {
      throw new Error(`Insufficient available quantity. Only ${donation.availableQuantity} ${donation.unit} left.`);
    }

    // Reserve quantity safely
    donation.availableQuantity -= qty;
    donation.reservedQuantity += qty;
    if (donation.availableQuantity === 0) {
      donation.status = DONATION_STATUS.RESERVED;
    }
    donations[donationIndex] = donation;
    this.setItem(STORAGE_KEYS.DONATIONS, donations);

    // Create request
    const requests = this.getRequests();
    const newRequest = {
      id: generateId('req'),
      donationId,
      donationTitle: donation.title,
      donorId: donation.donorId,
      donorName: donation.donorName,
      ngoId: ngoUser.id,
      ngoName: ngoUser.name,
      ngoPhone: ngoUser.phone || '',
      requestedQuantity: qty,
      unit: donation.unit,
      status: REQUEST_STATUS.PENDING,
      notes: notes || '',
      collectionWindow: collectionWindow || 'To be coordinated',
      createdAt: getIsoTimestamp(),
      updatedAt: getIsoTimestamp()
    };
    requests.unshift(newRequest);
    this.setItem(STORAGE_KEYS.REQUESTS, requests);

    // Create donor notification
    this.addNotification({
      userId: donation.donorId,
      title: 'New Food Pickup Request',
      message: `${ngoUser.name} requested ${qty} ${donation.unit} of "${donation.title}".`,
      type: 'request'
    });

    return newRequest;
  }

  updateRequestStatus(requestId, newStatus) {
    const requests = this.getRequests();
    const reqIndex = requests.findIndex((r) => r.id === requestId);
    if (reqIndex === -1) throw new Error('Request not found');

    const request = requests[reqIndex];
    const prevStatus = request.status;
    request.status = newStatus;
    request.updatedAt = getIsoTimestamp();

    // Adjust donation inventory on rejection / cancellation
    if (newStatus === REQUEST_STATUS.REJECTED || newStatus === REQUEST_STATUS.CANCELLED) {
      if (prevStatus === REQUEST_STATUS.PENDING || prevStatus === REQUEST_STATUS.APPROVED) {
        const donations = this.getDonations();
        const donIndex = donations.findIndex((d) => d.id === request.donationId);
        if (donIndex !== -1) {
          donations[donIndex].availableQuantity += request.requestedQuantity;
          donations[donIndex].reservedQuantity = Math.max(0, donations[donIndex].reservedQuantity - request.requestedQuantity);
          if (donations[donIndex].availableQuantity > 0 && donations[donIndex].status === DONATION_STATUS.RESERVED) {
            donations[donIndex].status = DONATION_STATUS.AVAILABLE;
          }
          this.setItem(STORAGE_KEYS.DONATIONS, donations);
        }
      }
    }

    // Complete donation when all fulfilled
    if (newStatus === REQUEST_STATUS.COMPLETED) {
      const donations = this.getDonations();
      const donIndex = donations.findIndex((d) => d.id === request.donationId);
      if (donIndex !== -1) {
        donations[donIndex].reservedQuantity = Math.max(0, donations[donIndex].reservedQuantity - request.requestedQuantity);
        if (donations[donIndex].availableQuantity === 0 && donations[donIndex].reservedQuantity === 0) {
          donations[donIndex].status = DONATION_STATUS.COMPLETED;
        }
        this.setItem(STORAGE_KEYS.DONATIONS, donations);
      }
    }

    requests[reqIndex] = request;
    this.setItem(STORAGE_KEYS.REQUESTS, requests);

    // Send notification to NGO
    const statusLabel = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    this.addNotification({
      userId: request.ngoId,
      title: `Request ${statusLabel}`,
      message: `Your request for ${request.requestedQuantity} ${request.unit} of "${request.donationTitle}" has been marked as ${newStatus}.`,
      type: newStatus
    });

    return request;
  }

  // --- Notifications ---
  getNotifications(userId) {
    const notifs = this.getItem(STORAGE_KEYS.NOTIFICATIONS) || [];
    if (!userId) return notifs;
    return notifs.filter((n) => n.userId === userId);
  }

  addNotification({ userId, title, message, type = 'info' }) {
    const notifs = this.getItem(STORAGE_KEYS.NOTIFICATIONS) || [];
    const newNotif = {
      id: generateId('notif'),
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: getIsoTimestamp()
    };
    notifs.unshift(newNotif);
    this.setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
    return newNotif;
  }

  markNotificationAsRead(id) {
    const notifs = this.getItem(STORAGE_KEYS.NOTIFICATIONS) || [];
    const updated = notifs.map((n) => (n.id === id ? { ...n, read: true } : n));
    this.setItem(STORAGE_KEYS.NOTIFICATIONS, updated);
  }

  // Reset database to initial seed state
  resetToSeed() {
    this.setItem(STORAGE_KEYS.USERS, SEED_USERS);
    this.setItem(STORAGE_KEYS.DONATIONS, SEED_DONATIONS);
    this.setItem(STORAGE_KEYS.REQUESTS, SEED_REQUESTS);
    this.setItem(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
    this.setItem(STORAGE_KEYS.CURRENT_USER, SEED_USERS[0]);
    return true;
  }
}

export const storageService = new LocalStorageService();
