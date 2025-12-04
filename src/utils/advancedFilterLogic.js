/**
 * Advanced Filtering Logic
 * Handles filtering customers based on advanced filter criteria
 */

import {
  getJobCategory,
  getEducationLevel,
  getMaritalStatus,
  getAgeRange,
} from './filterMappings';

/**
 * Apply advanced filters to customer array
 * @param {Array} customers - Customer array to filter
 * @param {Object} advancedFilters - Advanced filter criteria
 * @returns {Array} Filtered customers
 */
export const applyAdvancedFilters = (customers, advancedFilters) => {
  // Debug log
  console.log('🔍 applyAdvancedFilters called with:');
  console.log('  - customers.length:', customers?.length);
  console.log('  - advancedFilters:', advancedFilters);

  if (!advancedFilters || Object.values(advancedFilters).every(v => !Array.isArray(v) || v.length === 0)) {
    console.log('  ✓ No active filters, returning all customers');
    return customers;
  }

  const result = customers.filter(customer => {
    // Age Range Filter
    if (advancedFilters.age && advancedFilters.age.length > 0) {
      const customerAgeRange = getAgeRange(customer.age);
      console.log(`  Age: ${customer.age} → ${customerAgeRange}, looking for: ${advancedFilters.age}`);
      if (!advancedFilters.age.includes(customerAgeRange)) {
        return false;
      }
    }

    // Job Category Filter
    if (advancedFilters.job && advancedFilters.job.length > 0) {
      const customerJobCategory = getJobCategory(customer.job);
      if (!advancedFilters.job.includes(customerJobCategory)) {
        return false;
      }
    }

    // Education Level Filter
    if (advancedFilters.education && advancedFilters.education.length > 0) {
      const customerEducation = getEducationLevel(customer.education);
      if (!advancedFilters.education.includes(customerEducation)) {
        return false;
      }
    }

    // Marital Status Filter
    if (advancedFilters.marital && advancedFilters.marital.length > 0) {
      const customerMarital = getMaritalStatus(customer.marital);
      if (!advancedFilters.marital.includes(customerMarital)) {
        return false;
      }
    }

    // Housing Filter (optional - if field exists)
    if (advancedFilters.housing && advancedFilters.housing.length > 0) {
      const customerHousing = normalizeBoolean(customer.housing);
      if (!advancedFilters.housing.includes(customerHousing)) {
        return false;
      }
    }

    // Loan Filter (optional - if field exists)
    if (advancedFilters.loan && advancedFilters.loan.length > 0) {
      const customerLoan = normalizeBoolean(customer.loan);
      if (!advancedFilters.loan.includes(customerLoan)) {
        return false;
      }
    }

    return true;
  });

  console.log('  ✓ Filter result:', result.length, 'customers');
  return result;
};

/**
 * Normalize boolean/string values to standardized format
 * @param {*} value - Value to normalize
 * @returns {string} Normalized value: 'yes', 'no', or 'unknown'
 */
const normalizeBoolean = (value) => {
  const str = (value || '').toString().toLowerCase().trim();

  if (['ya', 'yes', 'true', '1', 'y'].includes(str)) return 'yes';
  if (['tidak', 'no', 'false', '0', 'n'].includes(str)) return 'no';

  return 'unknown';
};

/**
 * Check if any advanced filters are active
 * @param {Object} advancedFilters - Advanced filter criteria
 * @returns {boolean} True if any filter is active
 */
export const hasActiveAdvancedFilters = (advancedFilters) => {
  if (!advancedFilters) return false;

  return Object.values(advancedFilters).some(
    v => Array.isArray(v) && v.length > 0
  );
};
