import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import SalesAccountTable from '@/components/ManageProfile/SalesAccountTable';
import Loading from '@/components/Common/Loading';
import Alert from '@/components/Common/Alert';
import { useTheme } from '@/context/ThemeContext.jsx';
import { userService } from '@/services/index.js';

const ManageProfilePage = () => {
  const { darkMode } = useTheme();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setAccounts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Gagal mengambil data akun');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async (formData) => {
    try {
      await userService.createUser(formData);
      setSuccess('Akun sales berhasil ditambahkan');
      fetchAccounts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menambahkan akun');
      console.error('Add error:', err);
    }
  };

  const handleDeleteAccount = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus akun ini?')) {
      try {
        await userService.deleteUser(id);
        setSuccess('Akun berhasil dihapus');
        fetchAccounts();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Gagal menghapus akun');
        console.error('Delete error:', err);
      }
    }
  };

  if (loading) return <Loading fullScreen={true} />;

  return (
    <MainLayout>
      <div className="space-y-6 animate-fadeIn w-full">
        {/* Page Header with Gradient */}
        <div className={`rounded-xl p-5 ${
          darkMode
            ? 'bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900'
            : 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600'
        }`}>
          <h1 className="text-3xl font-bold text-white">
            Manage Sales Profiles
          </h1>
        </div>

        {/* Alerts */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}
        {success && (
          <Alert
            type="success"
            message={success}
            onClose={() => setSuccess('')}
          />
        )}

        {/* Card Wrapper — sama style seperti DataInput Section */}
        <div className={`border rounded-xl shadow-sm p-4 transition-colors ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-700'
          }`}>
            Sales Account Management
          </h3>

          <p className={`text-sm mb-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Add or remove sales accounts registered in the system.
          </p>

          <SalesAccountTable
            accounts={accounts}
            onAdd={handleAddAccount}
            onDelete={handleDeleteAccount}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ManageProfilePage;
