/**
 * Format a number as Euro currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return `€${Number(amount).toFixed(2)}`;
}; 