import React, { useState } from 'react';
import Modal from '../Common/Modal';
import { Plus, Trash2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';

const SalesAccountTable = ({ accounts = [], onAdd, onDelete }) => {
  const { darkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'sales',
  });

  const handleSubmit = () => {
    if (onAdd) onAdd(formData);
    setFormData({ name: '', email: '', password: '', role: 'sales' });
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header Button */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
          >
            <Plus size={18} />
            Add Account
          </button>
        </div>

        {/* Table */}
        <div className={`border rounded-xl shadow-sm overflow-hidden transition-colors ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          {accounts && accounts.length > 0 ? (
            <table className="w-full text-sm">
              <thead className={`border-b transition-colors ${
                darkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <tr>
                  <th className={`px-5 py-3 text-left font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    No.
                  </th>
                  <th className={`px-5 py-3 text-left font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Username
                  </th>
                  <th className={`px-5 py-3 text-left font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Email
                  </th>
                  <th className={`px-5 py-3 text-left font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Role
                  </th>
                  <th className={`px-5 py-3 text-left font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {accounts.map((account, index) => (
                  <tr
                    key={account._id || index}
                    className={`border-b transition ${
                      darkMode
                        ? 'border-gray-700 hover:bg-gray-700'
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <td className={`px-5 py-3 font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {index + 1}
                    </td>

                    <td className={`px-5 py-3 ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>{account.name}</td>

                    <td className={`px-5 py-3 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{account.email}</td>

                    <td className="px-5 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        darkMode
                          ? 'bg-primary-900/30 text-primary-400'
                          : 'bg-primary-100 text-primary-700'
                      }`}>
                        {account.role === 'admin' ? 'Admin' : 'Sales'}
                      </span>
                    </td>

                    <td className="px-5 py-3 flex items-center gap-3">
                      <button
                        onClick={() => onDelete && onDelete(account._id)}
                        className={`p-1 rounded-lg transition ${
                          darkMode
                            ? 'text-red-400 hover:bg-red-900/30 hover:text-red-300'
                            : 'text-red-500 hover:bg-red-50 hover:text-red-600'
                        }`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={`text-center py-8 transition-colors ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              No sales accounts registered.
            </div>
          )}
        </div>
      </div>

      {/* Modal Add New Account */}
      <Modal
        isOpen={isModalOpen}
        title="Add New Sales"
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <div className="space-y-4">
          {/* Username */}
          <div>
            <label className={`text-sm font-semibold mb-1 block ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Username
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter username"
            />
          </div>

          {/* Email */}
          <div>
            <label className={`text-sm font-semibold mb-1 block ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="email@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className={`text-sm font-semibold mb-1 block ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter password"
            />
          </div>

          {/* Role - Radio Modern */}
          <div>
            <label className={`text-sm font-semibold mb-2 block ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Role
            </label>

            <div className="flex items-center gap-4">
              {/* Sales Radio */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="sales"
                  checked={formData.role === 'sales'}
                  onChange={handleChange}
                  className="appearance-none w-4 h-4 border-2 border-primary-500 rounded-full checked:bg-primary-500 checked:border-primary-500 transition"
                />
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Sales</span>
              </label>

              {/* Admin Radio */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === 'admin'}
                  onChange={handleChange}
                  className="appearance-none w-4 h-4 border-2 border-primary-500 rounded-full checked:bg-primary-500 checked:border-primary-500 transition"
                />
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Admin</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-100'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SalesAccountTable;
