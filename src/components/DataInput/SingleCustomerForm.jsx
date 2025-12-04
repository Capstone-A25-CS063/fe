import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import Alert from '../Common/Alert';
import Loading from '../Common/Loading';
import { useTheme } from '@/context/ThemeContext.jsx';

const SingleCustomerForm = ({ onClose, onSubmit, loading = false }) => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    nama_nasabah: '',
    nomor_telepon: '',
    age: '',
    job: '',
    marital: '',
    education: '',
    default: 'no',
    housing: 'no',
    loan: 'no',
    contact: 'cellular',
    month: 'jan',
    day_of_week: 'mon',
    campaign: 1,
    pdays: 999,
    previous: 0,
    poutcome: 'nonexistent',
  });

  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');

  // Job options
  const jobOptions = [
    'admin.', 'technician', 'services', 'management', 'retired', 
    'blue-collar', 'unemployed', 'entrepreneur', 'housemaid', 'unknown', 
    'self-employed', 'student'
  ];

  // Education options
  const educationOptions = [
    'primary', 'secondary', 'tertiary', 'unknown'
  ];

  // Marital options
  const maritalOptions = ['single', 'married', 'divorced', 'unknown'];

  // Month options
  const monthOptions = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
  ];

  // Day options
  const dayOptions = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  // Contact options
  const contactOptions = ['cellular', 'telephone'];

  // Outcome options
  const outcomeOptions = ['success', 'failure', 'nonexistent'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'campaign' || name === 'pdays' || name === 'previous'
        ? parseInt(value) || ''
        : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.age || formData.age < 17 || formData.age > 100) {
      newErrors.age = 'Age must be between 17 and 100';
    }

    if (!formData.job) {
      newErrors.job = 'Job is required';
    }

    if (!formData.marital) {
      newErrors.marital = 'Marital status is required';
    }

    if (!formData.education) {
      newErrors.education = 'Education is required';
    }

    if (!formData.campaign || formData.campaign < 1) {
      newErrors.campaign = 'Campaign must be at least 1';
    }

    if (formData.pdays < 0) {
      newErrors.pdays = 'Days since contact cannot be negative';
    }

    if (formData.previous < 0) {
      newErrors.previous = 'Previous contacts cannot be negative';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlertMessage('Please fix the errors below');
      return;
    }

    // Submit
    try {
      await onSubmit(formData);
      setAlertMessage('');
    } catch (error) {
      setAlertMessage(error.message || 'Submission failed');
    }
  };

  if (loading) {
    return <Loading fullScreen={true} />;
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        
        {/* HEADER - FIXED */}
        <div className={`flex-shrink-0 bg-gradient-to-r ${darkMode ? 'from-blue-700 to-blue-800' : 'from-blue-600 to-blue-700'} p-6 flex items-center justify-between shadow-md`}>
          <div className="flex-1 pr-4">
            <h2 className="text-2xl font-bold text-white">Quick Customer Prediction</h2>
            <p className={`text-sm mt-1 ${darkMode ? 'text-blue-200' : 'text-blue-100'}`}>Enter customer details to get deposit score prediction</p>
          </div>
          <button
            onClick={onClose}
            className={`flex-shrink-0 p-2 rounded-lg transition text-white ${darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-800'}`}
          >
            <X size={24} />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* ALERT */}
            {alertMessage && (
              <Alert
                type="error"
                message={alertMessage}
                onClose={() => setAlertMessage('')}
              />
            )}

            {/* SECTION 1: IDENTITAS */}
            <div className={`p-5 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'}`}>
              <h3 className={`text-sm font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <div className={`w-1 h-4 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                Customer Identity
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Customer Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="nama_nasabah"
                    value={formData.nama_nasabah}
                    onChange={handleChange}
                    placeholder="e.g., Budi Santoso"
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${darkMode ? 'bg-gray-600 border border-gray-500 text-white placeholder-gray-400' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Phone Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="nomor_telepon"
                    value={formData.nomor_telepon}
                    onChange={handleChange}
                    placeholder="e.g., 08123456789"
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${darkMode ? 'bg-gray-600 border border-gray-500 text-white placeholder-gray-400' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: DEMOGRAFIS */}
            <div className={`p-5 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'}`}>
              <h3 className={`text-sm font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <div className={`w-1 h-4 rounded-full ${darkMode ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
                Demographics & Financial
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="17"
                    max="100"
                    placeholder="e.g., 35"
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.age 
                        ? darkMode ? 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-gray-600 text-white' : 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900'
                        : darkMode ? 'border border-gray-500 focus:ring-purple-500 focus:border-purple-500 bg-gray-600 text-white placeholder-gray-400' : 'border border-gray-300 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  {errors.age && <p className={`text-xs mt-1.5 font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.age}</p>}
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Job *
                  </label>
                  <select
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.job
                        ? darkMode ? 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-gray-600 text-white' : 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900'
                        : darkMode ? 'border border-gray-500 focus:ring-purple-500 focus:border-purple-500 bg-gray-600 text-white' : 'border border-gray-300 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900'
                    }`}
                  >
                    <option value="">Select Job</option>
                    {jobOptions.map(job => (
                      <option key={job} value={job}>{job}</option>
                    ))}
                  </select>
                  {errors.job && <p className={`text-xs mt-1.5 font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.job}</p>}
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Marital Status *
                  </label>
                  <select
                    name="marital"
                    value={formData.marital}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.marital
                        ? darkMode ? 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-gray-600 text-white' : 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900'
                        : darkMode ? 'border border-gray-500 focus:ring-purple-500 focus:border-purple-500 bg-gray-600 text-white' : 'border border-gray-300 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900'
                    }`}
                  >
                    <option value="">Select Status</option>
                    {maritalOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.marital && <p className={`text-xs mt-1.5 font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.marital}</p>}
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Education *
                  </label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.education
                        ? darkMode ? 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-gray-600 text-white' : 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900'
                        : darkMode ? 'border border-gray-500 focus:ring-purple-500 focus:border-purple-500 bg-gray-600 text-white' : 'border border-gray-300 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900'
                    }`}
                  >
                    <option value="">Select Education</option>
                    {educationOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.education && <p className={`text-xs mt-1.5 font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.education}</p>}
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Default
                  </label>
                  <select
                    name="default"
                    value={formData.default}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:outline-none focus:border-purple-500 transition ${darkMode ? 'bg-gray-600 border border-gray-500 text-white' : 'bg-white border border-gray-300 text-gray-900'}`}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Housing
                  </label>
                  <select
                    name="housing"
                    value={formData.housing}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:outline-none focus:border-purple-500 transition ${darkMode ? 'bg-gray-600 border border-gray-500 text-white' : 'bg-white border border-gray-300 text-gray-900'}`}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Loan
                  </label>
                  <select
                    name="loan"
                    value={formData.loan}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:outline-none focus:border-purple-500 transition ${darkMode ? 'bg-gray-600 border border-gray-500 text-white' : 'bg-white border border-gray-300 text-gray-900'}`}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 3: KAMPANYE */}
            <div className={`p-5 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200'}`}>
              <h3 className={`text-sm font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <div className={`w-1 h-4 rounded-full ${darkMode ? 'bg-pink-400' : 'bg-pink-600'}`}></div>
                Campaign Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Contact Method
                  </label>
                  <select
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none focus:border-pink-500 transition ${darkMode ? 'bg-gray-600 border border-gray-500 text-white' : 'bg-white border border-gray-300 text-gray-900'}`}
                  >
                    {contactOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Last Campaign Month
                  </label>
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none focus:border-pink-500 transition ${darkMode ? 'bg-gray-600 border border-gray-500 text-white' : 'bg-white border border-gray-300 text-gray-900'}`}
                  >
                    {monthOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Day of Week
                  </label>
                  <select
                    name="day_of_week"
                    value={formData.day_of_week}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none focus:border-pink-500 transition ${darkMode ? 'bg-gray-600 border border-gray-500 text-white' : 'bg-white border border-gray-300 text-gray-900'}`}
                  >
                    {dayOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Campaign Contacts *
                  </label>
                  <input
                    type="number"
                    name="campaign"
                    value={formData.campaign}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g., 1"
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.campaign
                        ? darkMode ? 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-gray-600 text-white' : 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900'
                        : darkMode ? 'border border-gray-500 focus:ring-pink-500 focus:border-pink-500 bg-gray-600 text-white placeholder-gray-400' : 'border border-gray-300 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  {errors.campaign && <p className={`text-xs mt-1.5 font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.campaign}</p>}
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Days Since Last Contact
                  </label>
                  <input
                    type="number"
                    name="pdays"
                    value={formData.pdays}
                    onChange={handleChange}
                    min="0"
                    placeholder="999 = never contacted"
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.pdays
                        ? darkMode ? 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-gray-600 text-white' : 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900'
                        : darkMode ? 'border border-gray-500 focus:ring-pink-500 focus:border-pink-500 bg-gray-600 text-white placeholder-gray-400' : 'border border-gray-300 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  {errors.pdays && <p className={`text-xs mt-1.5 font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.pdays}</p>}
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Previous Contacts
                  </label>
                  <input
                    type="number"
                    name="previous"
                    value={formData.previous}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g., 0"
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.previous
                        ? darkMode ? 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-gray-600 text-white' : 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900'
                        : darkMode ? 'border border-gray-500 focus:ring-pink-500 focus:border-pink-500 bg-gray-600 text-white placeholder-gray-400' : 'border border-gray-300 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  {errors.previous && <p className={`text-xs mt-1.5 font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.previous}</p>}
                </div>

                <div className="col-span-2">
                  <label className={`block text-xs font-semibold mb-2 uppercase ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Previous Campaign Outcome
                  </label>
                  <select
                    name="poutcome"
                    value={formData.poutcome}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none focus:border-pink-500 transition ${darkMode ? 'bg-gray-600 border border-gray-500 text-white' : 'bg-white border border-gray-300 text-gray-900'}`}
                  >
                    {outcomeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* BUTTONS - FIXED */}
        <div className={`flex-shrink-0 flex gap-3 p-6 justify-end border-t ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
          <button
            onClick={onClose}
            className={`px-6 py-2.5 rounded-lg font-semibold transition active:scale-95 ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-100' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2.5 rounded-lg text-white font-semibold transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-sm ${darkMode ? 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'}`}
          >
            <Send size={16} />
            Get Prediction
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCustomerForm;
