/**
 * Formats a number as a price string with the Indian Rupee symbol (₹)
 * @param {number} price - The price to format
 * @returns {string} The formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};