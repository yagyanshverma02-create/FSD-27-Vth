import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { UNITS, DIETARY_TAGS } from '../../utils/constants';
import { FOOD_TYPES } from '../../services/storageKeys';
import { validateDonation } from '../../utils/validators';
import { Clock, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import './DonationFormModal.css';

const PRESET_FOOD_IMAGES = [
  { label: 'Hot Cooked Meals', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Wraps & Sandwiches', url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80' },
  { label: 'Artisan Bakery', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fresh Produce / Fruits', url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80' },
  { label: 'Rice & Curry Feast', url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80' },
  { label: 'Salad & Veg Bowl', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' }
];

export const DonationFormModal = ({
  isOpen,
  onClose,
  initialData = null,
  onSubmit,
  currentDonor
}) => {
  // Compute default expiry 6 hours ahead formatted for input type="datetime-local"
  const getDefaultExpiry = () => {
    const d = new Date();
    d.setHours(d.getHours() + 6);
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState({
    title: '',
    foodType: FOOD_TYPES.COOKED_MEALS,
    totalQuantity: '30',
    unit: 'portions',
    dietaryTags: ['Vegetarian'],
    expiryTime: getDefaultExpiry(),
    storageCondition: 'Keep warm (>60°C) in insulated thermal carriers.',
    pickupAddress: currentDonor?.address || '428 Culinary Ave, Downtown District',
    description: '',
    imageUrl: PRESET_FOOD_IMAGES[0].url,
    safetyCertified: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      const expiryFormatted = initialData.expiryTime
        ? new Date(new Date(initialData.expiryTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)
        : getDefaultExpiry();

      setFormData({
        title: initialData.title || '',
        foodType: initialData.foodType || FOOD_TYPES.COOKED_MEALS,
        totalQuantity: String(initialData.totalQuantity || initialData.quantity || '30'),
        unit: initialData.unit || 'portions',
        dietaryTags: initialData.dietaryTags || ['Vegetarian'],
        expiryTime: expiryFormatted,
        storageCondition: initialData.storageCondition || 'Keep warm (>60°C).',
        pickupAddress: initialData.pickupAddress || currentDonor?.address || '',
        description: initialData.description || '',
        imageUrl: initialData.imageUrl || PRESET_FOOD_IMAGES[0].url,
        safetyCertified: true
      });
    } else {
      setFormData({
        title: '',
        foodType: FOOD_TYPES.COOKED_MEALS,
        totalQuantity: '30',
        unit: 'portions',
        dietaryTags: ['Vegetarian'],
        expiryTime: getDefaultExpiry(),
        storageCondition: 'Keep warm (>60°C) in insulated thermal carriers.',
        pickupAddress: currentDonor?.address || '428 Culinary Ave, Downtown District',
        description: '',
        imageUrl: PRESET_FOOD_IMAGES[0].url,
        safetyCertified: true
      });
    }
    setErrors({});
  }, [initialData, currentDonor, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleToggleDietaryTag = (tag) => {
    setFormData((prev) => {
      const exists = prev.dietaryTags.includes(tag);
      return {
        ...prev,
        dietaryTags: exists ? prev.dietaryTags.filter((t) => t !== tag) : [...prev.dietaryTags, tag]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.safetyCertified) {
      toast.error('You must certify food safety and hygienic preparation standards.');
      return;
    }

    const validation = validateDonation({
      ...formData,
      quantity: formData.totalQuantity
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Please resolve the highlighted errors.');
      return;
    }

    const payload = {
      ...formData,
      totalQuantity: Number(formData.totalQuantity),
      quantity: Number(formData.totalQuantity),
      expiryTime: new Date(formData.expiryTime).toISOString(),
      donorId: currentDonor?.id || 'user_donor_1',
      donorName: currentDonor?.name || 'Verified Food Donor',
      donorPhone: currentDonor?.phone || '+1 (555) 234-5678',
      coordinates: currentDonor?.coordinates || { latitude: 28.6189, longitude: 77.2140 }
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Update Surplus Food Listing' : 'List Surplus Food Donation'}
      subtitle="Publish surplus portions for immediate discovery by verified frontline NGOs"
      maxWidth="720px"
    >
      <form onSubmit={handleSubmit} className="donation-form">
        {/* Title */}
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            DISH / SURPLUS FOOD TITLE <span className="required">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={`form-input ${errors.title ? 'form-input--error' : ''}`}
            placeholder="e.g. Saffron Basmati Pilaf & Mixed Vegetable Medley"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        {/* Category & Quantity Row */}
        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="foodType">
              FOOD CATEGORY <span className="required">*</span>
            </label>
            <select
              id="foodType"
              name="foodType"
              className="form-select"
              value={formData.foodType}
              onChange={handleChange}
            >
              {Object.values(FOOD_TYPES).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              AVAILABLE QUANTITY & UNIT <span className="required">*</span>
            </label>
            <div className="input-group-dual">
              <input
                type="number"
                min="1"
                step="1"
                name="totalQuantity"
                className={`form-input ${errors.quantity ? 'form-input--error' : ''}`}
                value={formData.totalQuantity}
                onChange={handleChange}
                required
              />
              <select
                name="unit"
                className="form-select select-unit"
                value={formData.unit}
                onChange={handleChange}
              >
                {UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            {errors.quantity && <span className="form-error">{errors.quantity}</span>}
          </div>
        </div>

        {/* Dietary Tags */}
        <div className="form-group">
          <label className="form-label">DIETARY SPECIFICATIONS</label>
          <div className="tags-selector">
            {DIETARY_TAGS.map((tag) => {
              const selected = formData.dietaryTags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  className={`tag-toggle-btn ${selected ? 'tag-toggle-btn--active' : ''}`}
                  onClick={() => handleToggleDietaryTag(tag)}
                >
                  {tag} {selected && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Expiry & Temperature Storage */}
        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="expiryTime">
              CONSUME-BEFORE CUTOFF <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <Clock size={16} className="field-icon" />
              <input
                id="expiryTime"
                type="datetime-local"
                name="expiryTime"
                className={`form-input form-input--icon ${errors.expiryTime ? 'form-input--error' : ''}`}
                value={formData.expiryTime}
                onChange={handleChange}
                required
              />
            </div>
            {errors.expiryTime && <span className="form-error">{errors.expiryTime}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="storageCondition">
              THERMAL STORAGE PROTOCOL
            </label>
            <input
              id="storageCondition"
              type="text"
              name="storageCondition"
              className="form-input"
              placeholder="e.g. Keep warm (>60°C) or chilled (<4°C)"
              value={formData.storageCondition}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Pickup Address */}
        <div className="form-group">
          <label className="form-label" htmlFor="pickupAddress">
            COLLECTION / PICKUP ADDRESS <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <MapPin size={16} className="field-icon" />
            <input
              id="pickupAddress"
              type="text"
              name="pickupAddress"
              className={`form-input form-input--icon ${errors.pickupAddress ? 'form-input--error' : ''}`}
              placeholder="e.g. 428 Culinary Ave, Downtown District"
              value={formData.pickupAddress}
              onChange={handleChange}
              required
            />
          </div>
          {errors.pickupAddress && <span className="form-error">{errors.pickupAddress}</span>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label" htmlFor="description">
            PREPARATION DETAILS & PACKAGING NOTES
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="form-textarea"
            placeholder="Describe food contents, packaging format (steam trays, takeout containers), and pickup instructions..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Preset Photo Selector */}
        <div className="form-group">
          <label className="form-label">SELECT FOOD PHOTO</label>
          <div className="preset-images-grid">
            {PRESET_FOOD_IMAGES.map((img, idx) => (
              <div
                key={idx}
                className={`preset-image-card ${formData.imageUrl === img.url ? 'preset-image-card--active' : ''}`}
                onClick={() => setFormData((p) => ({ ...p, imageUrl: img.url }))}
              >
                <img src={img.url} alt={img.label} />
                <span>{img.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Food Safety Guarantee Checkbox */}
        <div className="form-safety-box">
          <label className="safety-checkbox-label">
            <input
              type="checkbox"
              checked={formData.safetyCertified}
              onChange={(e) => setFormData((p) => ({ ...p, safetyCertified: e.target.checked }))}
            />
            <div className="safety-checkbox-text">
              <strong>Food Safety & Hygiene Pledge</strong>
              <span>
                I certify that this surplus food was prepared under licensed hygienic standards, packed in clean food-grade containers, and stored within verified safe temperature ranges.
              </span>
            </div>
          </label>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {initialData ? 'Save Changes' : 'Publish Surplus Listing'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
