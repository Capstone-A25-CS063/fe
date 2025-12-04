import api from './api';

// Auth Services
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    console.log('🔐 Login Response:', response.data);
    return response.data;
  },

  register: async (email, password, username) => {
    const response = await api.post('/auth/register', { email, password, username });
    console.log('✅ Register Response:', response.data);
    return response.data;
  },
};

// Customer Services
export const customerService = {
  getAllCustomers: async (params) => {
    const response = await api.get('/customers', { params });
    console.log('📊 Customer Response:', response.data);
    console.log('📈 Total customers:', response.data?.total);
    console.log('📋 Items in page:', response.data?.count);
    console.log('⏭️ Skip value:', response.data?.skip);
    console.log('🔀 Sort order:', response.data?.sortOrder);
    console.log('🗂️ Customer data count:', response.data?.data?.length);
    return response.data;
  },

  getCustomerById: async (id) => {
    const response = await api.get(`/customers/${id}`);
    console.log('👤 Customer Detail:', response.data);
    return response.data;
  },

  updateCustomer: async (id, data) => {
    try {
      console.log('📡 UPDATE REQUEST:');
      console.log('  Endpoint: PATCH /customers/{id}/status');
      console.log('  Customer ID:', id);
      console.log('  Payload:', data);
      
      // Validate data before sending
      if (!id) {
        console.error('❌ ERROR: Customer ID is missing or null!');
        throw new Error('Customer ID is required');
      }

      if (!data || Object.keys(data).length === 0) {
        console.warn('⚠️ WARNING: Payload is empty. No fields to update.');
      }

      const response = await api.patch(`/customers/${id}/status`, data);
      console.log('✅ UPDATE SUCCESS:');
      console.log('  Response:', response.data);
      return response.data;
    } catch (err) {
      console.error('❌ UPDATE FAILED:');
      console.error('  Status:', err?.response?.status);
      console.error('  Message:', err?.response?.data?.message);
      console.error('  Full Error:', err?.response?.data);
      console.error('  Network Error:', err?.message);
      throw err;
    }
  },

  deleteCustomer: async (id) => {
    const response = await api.delete(`/customers/${id}`);
    console.log('🗑️ Customer Deleted:', response.data);
    return response.data;
  },
};

// Import Services
export const importService = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/customers/import-batch', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('📤 File Upload Response:', response.data);
    return response.data;
  },

  getImportStatus: async (importId) => {
    const response = await api.get(`/import/${importId}`);
    console.log('📥 Import Status:', response.data);
    return response.data;
  },
};

// Prediction Services
export const predictionService = {
  predictSingleCustomer: async (customerData) => {
    try {
      // Call backend predict endpoint (backend will call ML API)
      const response = await api.post('/predictions/single', customerData);
      console.log('🔮 Prediction Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Prediction Error:', error?.response?.data);
      throw error;
    }
  },

  predictBatchCustomers: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/predictions/batch', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('🔮 Batch Prediction Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Batch Prediction Error:', error?.response?.data);
      throw error;
    }
  },
};

// User Services (for profile management)
export const userService = {
  getAllUsers: async () => {
    const response = await api.get('/users');
    console.log('👥 All Users:', response.data);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post('/auth/register', userData);
    console.log('👤 New User Created:', response.data);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    console.log('✏️ User Updated:', response.data);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    console.log('🗑️ User Deleted:', response.data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/profile');
    console.log('🔐 Current User Profile:', response.data);
    return response.data;
  },
};
