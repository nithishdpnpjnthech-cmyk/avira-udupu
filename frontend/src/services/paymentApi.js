import apiClient from './api';

const API_BASE = 'https://nishmitha-roots-7.onrender.com/api/payments/razorpay';

const paymentApi = {
  /**
   * Create a Razorpay order
   * @param {string} email - User email
   * @returns {Promise} Razorpay order details
   */
  createOrder: async (email) => {
    try {
      const response = await fetch(
        `${API_BASE}/create-order?email=${encodeURIComponent(email)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create payment order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  },

  /**
   * Verify Razorpay payment
   * @param {Object} paymentData - Payment verification data
   * @returns {Promise} Verification result
   */
  verifyPayment: async (paymentData) => {
    try {
      const response = await fetch(
        `${API_BASE}/verify-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentData)
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Payment verification failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },

  /**
   * Get payment status
   * @param {string} email - User email
   * @returns {Promise} Payment status
   */
  getPaymentStatus: async (email) => {
    try {
      const response = await fetch(
        `${API_BASE}/payment-status?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get payment status');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting payment status:', error);
      throw error;
    }
  }
};

export default paymentApi;
