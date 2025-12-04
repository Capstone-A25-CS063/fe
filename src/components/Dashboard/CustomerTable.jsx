import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import { Phone, Briefcase, User, Heart, BookOpen, Zap, MessageSquare, Save, X as CloseIcon, Calendar, Smartphone, TrendingUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';

// Warna status
const callStatusColors = {
  not_called: '#6B7280', // gray
  attempted: '#3B82F6', // blue
  connected: '#10B981', // green
};

const interestStatusColors = {
  '': '#9CA3AF', // gray (default/select)
  approved: '#10B981', // green
  rejected: '#EF4444', // red
  pending: '#F59E0B', // yellow
};

// Helper component for info cards
const InfoCard = ({ icon: Icon, label, value, darkMode }) => (
  <div className={`border rounded-lg p-4 hover:border-blue-300 transition ${
    darkMode
      ? 'bg-gray-700 border-gray-600'
      : 'bg-white border-gray-200'
  }`}>
    <div className="flex items-center gap-2 mb-2">
      <div className={`p-2 rounded-lg ${
        darkMode
          ? 'bg-blue-900/30'
          : 'bg-blue-50'
      }`}>
        <Icon size={16} className="text-blue-600" />
      </div>
      <span className={`text-xs font-semibold uppercase tracking-wider ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>{label}</span>
    </div>
    <p className={`font-semibold text-sm ${
      darkMode ? 'text-white' : 'text-gray-900'
    }`}>{value}</p>
  </div>
);

// Dropdown reusable component
const StatusDropdown = ({ value, options, onChange, colorMap, disabled = false, darkMode = false }) => {
  const [open, setOpen] = useState(false);

  const currentColor = colorMap[value] || '#6B7280'; // default gray

  return (
    <div className="relative inline-block w-full">
      {/* Toggle Button */}
      <button
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg shadow-sm transition ${
          darkMode
            ? `border border-gray-600 ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-700' : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'}`
            : `border border-gray-300 ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white hover:bg-gray-50 cursor-pointer'}`
        }`}
      >
        <span className="font-medium" style={{ color: currentColor }}>
          {options.find((o) => o.value === value)?.label || 'Select'}
        </span>

        <svg
          className={`w-4 h-4 transition-transform`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className={`absolute mt-2 w-full rounded-lg shadow-lg z-20 transition-all origin-top ${
          darkMode
            ? 'bg-gray-700 border border-gray-600'
            : 'bg-white border border-gray-200'
        }`}>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer text-sm transition ${
                darkMode
                  ? 'text-gray-300 hover:bg-gray-600'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CustomerTable = ({ customers = [], onCustomerSelect, currentPage = 1, pageSize = 20, skip = 0 }) => {
  const { darkMode } = useTheme();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [note, setNote] = useState('');
  const [callStatus, setCallStatus] = useState('not_called');
  const [interestStatus, setInterestStatus] = useState('');
  
  // Optimistic updates map - track pending updates while backend processes
  const [pendingUpdates, setPendingUpdates] = useState({});

  // Clear pending updates when customers prop changes (parent data updated)
  useEffect(() => {
    setPendingUpdates({});
  }, [customers]);

  const handleOpenDetail = (customer) => {
    setSelectedCustomer(customer);
    setNote(customer.catatan || customer.salesNotes || '');
    setCallStatus(customer.callStatus || 'not_called');
    setInterestStatus(customer.decisionStatus || '');
  };

  const handleTableRowStatusChange = async (customer, field, newValue) => {
    // Optimistic update - show change immediately in UI
    setPendingUpdates(prev => ({
      ...prev,
      [customer._id]: {
        ...prev[customer._id],
        [field]: newValue
      }
    }));
    
    // Then update backend
    const updatedCustomer = {
      ...customer,
      [field]: newValue
    };
    
    // Update backend and wait for parent to re-render
    try {
      await Promise.resolve(onCustomerSelect(updatedCustomer));
      // After backend update completes, give React time to process parent state updates
      // This ensures pendingUpdates useEffect has access to updated data
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (err) {
      console.error('Update failed:', err);
      // Revert on error by clearing pending update
      setPendingUpdates(prev => {
        const updated = { ...prev };
        delete updated[customer._id];
        return updated;
      });
    }
  };

  const handleSaveNote = async () => {
    if (onCustomerSelect) {
      const updatedCustomer = {
        ...selectedCustomer,
        catatan: note,
        callStatus,
        decisionStatus: interestStatus,
      };
      
      // Call parent handler (async update to backend)
      try {
        await onCustomerSelect(updatedCustomer);
        // Add small delay to ensure parent state updates complete
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('Error updating customer:', error);
      }
    }
    
    // Close modal after update completes
    setSelectedCustomer(null);
  };

  if (!customers || customers.length === 0) {
    return (
      <div className={`rounded-lg p-8 text-center ${
        darkMode
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-white border border-gray-200'
      }`}>
        <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>No customer data</p>
      </div>
    );
  }

  return (
    <>
      <div className={`overflow-x-auto rounded-lg border ${
        darkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>
        <table className="w-full text-sm">
          <thead>
            <tr className={`border-b ${
              darkMode
                ? 'border-gray-700 bg-gray-700'
                : 'border-gray-200'
            }`}>
              <th className={`px-4 py-3 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                No.
              </th>
              <th className={`px-4 py-3 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Customer Name
              </th>
              <th className={`px-4 py-3 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Score
              </th>
              <th className={`px-4 py-3 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Phone
              </th>
              <th className={`px-4 py-3 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Call Status
              </th>
              <th className={`px-4 py-3 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Decision Status
              </th>
              <th className={`px-4 py-3 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer, index) => {
              const score = parseFloat(customer.score) || 0;
              
              // Determine score color based on range
              let scoreColor = 'text-red-600';      // Red: 0-33%
              let scoreBgColor = 'bg-red-100';
              
              if (score >= 67) {
                scoreColor = 'text-green-600';      // Green: 67-100%
                scoreBgColor = 'bg-green-100';
              } else if (score >= 34) {
                scoreColor = 'text-yellow-600';     // Yellow: 34-66%
                scoreBgColor = 'bg-yellow-100';
              }
              
              // Calculate priority based on table row number (1-20 per page)
              const globalIndex = index + 1;

              return (
                <tr
                  key={customer._id || index}
                  className={`border-b transition ${
                    darkMode
                      ? 'border-gray-700 hover:bg-gray-700'
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <td className={`px-4 py-3 font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}>
                    {String(globalIndex).padStart(3, '0')}
                  </td>

                  <td className={`px-4 py-3 font-medium ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {customer.nama_nasabah}
                  </td>

                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full font-semibold ${scoreColor} ${scoreBgColor}`}>
                      {score}%
                    </span>
                  </td>

                  <td className={`px-4 py-3 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {customer.nomor_telepon}
                  </td>

                  {/* Call Status */}
                  <td className="px-4 py-3">
                    <StatusDropdown
                      value={pendingUpdates[customer._id]?.callStatus || customer.callStatus || 'not_called'}
                      onChange={(val) =>
                        handleTableRowStatusChange(customer, 'callStatus', val)
                      }
                      options={[
                        { value: 'not_called', label: 'Not Called' },
                        { value: 'attempted', label: 'Attempted' },
                        { value: 'connected', label: 'Connected' },
                      ]}
                      colorMap={callStatusColors}
                      darkMode={darkMode}
                    />
                  </td>

                  {/* Interest Status */}
                  <td className="px-4 py-3">
                    <StatusDropdown
                      value={pendingUpdates[customer._id]?.decisionStatus || customer.decisionStatus || ''}
                      onChange={(val) =>
                        handleTableRowStatusChange(customer, 'decisionStatus', val)
                      }
                      options={[
                        { value: '', label: 'Select' },
                        { value: 'approved', label: 'Approved' },
                        { value: 'pending', label: 'Pending' },
                        { value: 'rejected', label: 'Rejected' },
                      ]}
                      colorMap={interestStatusColors}
                      disabled={(pendingUpdates[customer._id]?.callStatus || customer.callStatus) !== 'connected'}
                      darkMode={darkMode}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleOpenDetail(customer)}
                      className={`font-semibold transition ${
                        darkMode
                          ? 'text-blue-400 hover:text-blue-300'
                          : 'text-blue-600 hover:text-blue-800'
                      }`}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ===================== MODAL ===================== */}

      <Modal
        isOpen={!!selectedCustomer}
        title="Customer Details"
        onClose={() => setSelectedCustomer(null)}
        size="md"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* HEADER WITH CUSTOMER NAME & SCORE */}
            <div className={`bg-gradient-to-br p-6 rounded-2xl border transition ${
              darkMode
                ? 'from-gray-700 via-gray-700 to-gray-600 border-gray-600'
                : 'from-blue-50 via-blue-50 to-indigo-50 border-blue-100'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedCustomer.nama_nasabah}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>ID: {selectedCustomer._id?.slice(-8) || '-'}</p>
                </div>
                
                {(() => {
                  const score = parseFloat(selectedCustomer.score) || 0;
                  let scoreColor = 'text-red-600';
                  let scoreBgColor = 'bg-red-100';
                  let scoreLabel = 'Poor';
                  
                  if (score >= 67) {
                    scoreColor = 'text-green-600';
                    scoreBgColor = 'bg-green-100';
                    scoreLabel = 'Good';
                  } else if (score >= 34) {
                    scoreColor = 'text-yellow-600';
                    scoreBgColor = 'bg-yellow-100';
                    scoreLabel = 'Medium';
                  }
                  
                  return (
                    <div className={`text-right px-4 py-3 rounded-xl ${scoreBgColor}`}>
                      <p className={`text-xs font-semibold mb-1 ${
                        darkMode ? 'text-gray-700' : 'text-gray-600'
                      }`}>Lead Score</p>
                      <p className={`text-3xl font-bold ${scoreColor}`}>
                        {selectedCustomer.score}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* INFO CARDS GRID */}
            <div className="grid grid-cols-2 gap-4">
              <InfoCard icon={Phone} label="Phone" value={selectedCustomer.nomor_telepon} darkMode={darkMode} />
              <InfoCard icon={User} label="Age" value={selectedCustomer.age || '-'} darkMode={darkMode} />
              <InfoCard icon={Briefcase} label="Job" value={selectedCustomer.job || '-'} darkMode={darkMode} />
              <InfoCard icon={Heart} label="Marital" value={selectedCustomer.marital || '-'} darkMode={darkMode} />
              <InfoCard icon={BookOpen} label="Education" value={selectedCustomer.education || '-'} darkMode={darkMode} />
              <InfoCard icon={Zap} label="Status" value={selectedCustomer.prediction || '-'} darkMode={darkMode} />
            </div>

            {/* CAMPAIGN HISTORY SECTION */}
            <div className={`bg-gradient-to-br p-5 rounded-2xl border transition ${
              darkMode
                ? 'from-gray-700 to-gray-600 border-gray-600'
                : 'from-purple-50 to-pink-50 border-purple-200'
            }`}>
              <h4 className={`text-sm font-bold mb-4 flex items-center gap-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                <div className={`w-1 h-4 rounded-full ${
                  darkMode ? 'bg-purple-400' : 'bg-purple-600'
                }`}></div>
                Campaign History
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <InfoCard icon={Smartphone} label="Contact Method" value={selectedCustomer.contact || '-'} darkMode={darkMode} />
                <InfoCard icon={Calendar} label="Last Campaign Month" value={selectedCustomer.month || '-'} darkMode={darkMode} />
                <InfoCard icon={Calendar} label="Campaign Day" value={selectedCustomer.day_of_week || '-'} darkMode={darkMode} />
                <InfoCard icon={TrendingUp} label="Total Contacts" value={selectedCustomer.campaign || '-'} darkMode={darkMode} />
                <InfoCard icon={Calendar} label="Days Since Contact" value={selectedCustomer.pdays === 999 ? 'Never' : selectedCustomer.pdays || '-'} darkMode={darkMode} />
                <InfoCard icon={TrendingUp} label="Previous Contacts" value={selectedCustomer.previous || '-'} darkMode={darkMode} />
                <div className="col-span-2">
                  <InfoCard icon={Zap} label="Previous Outcome" value={selectedCustomer.poutcome || '-'} darkMode={darkMode} />
                </div>
              </div>
            </div>

            {/* CALL & DECISION STATUS SECTION */}
            <div className={`bg-gradient-to-br p-5 rounded-2xl border transition ${
              darkMode
                ? 'from-gray-700 to-gray-600 border-gray-600'
                : 'from-gray-50 to-gray-100 border-gray-200'
            }`}>
              <h4 className={`text-sm font-bold mb-4 flex items-center gap-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                <div className={`w-1 h-4 rounded-full ${
                  darkMode ? 'bg-blue-400' : 'bg-blue-600'
                }`}></div>
                Status Management
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Call Status */}
                <div>
                  <label className={`text-xs font-semibold mb-2 block uppercase tracking-wide ${
                    darkMode ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                    Call Status
                  </label>
                  <StatusDropdown
                    value={callStatus}
                    onChange={setCallStatus}
                    options={[
                      { value: 'not_called', label: 'Not Called' },
                      { value: 'attempted', label: 'Attempted' },
                      { value: 'connected', label: 'Connected' },
                    ]}
                    colorMap={callStatusColors}
                    darkMode={darkMode}
                  />
                </div>

                {/* Decision Status */}
                <div>
                  <label className={`text-xs font-semibold mb-2 block uppercase tracking-wide ${
                    darkMode ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                    Decision Status
                    {callStatus !== 'connected' && (
                      <span className={`text-xs ml-2 font-normal normal-case ${
                        darkMode ? 'text-orange-400' : 'text-orange-600'
                      }`}>(when connected)</span>
                    )}
                  </label>
                  <StatusDropdown
                    value={interestStatus}
                    onChange={setInterestStatus}
                    options={[
                      { value: '', label: 'Select' },
                      { value: 'approved', label: 'Approved' },
                      { value: 'pending', label: 'Pending' },
                      { value: 'rejected', label: 'Rejected' },
                    ]}
                    colorMap={interestStatusColors}
                    disabled={callStatus !== 'connected'}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>

            {/* NOTES SECTION */}
            <div className={`bg-gradient-to-br p-5 rounded-2xl border transition ${
              darkMode
                ? 'from-gray-700 to-gray-600 border-gray-600'
                : 'from-amber-50 to-orange-50 border-amber-100'
            }`}>
              <label className={`text-sm font-bold mb-3 flex items-center gap-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                <MessageSquare size={16} className={darkMode ? 'text-amber-400' : 'text-amber-600'} />
                Notes
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={`w-full rounded-lg p-3 h-24 focus:ring-2 focus:outline-none transition ${
                  darkMode
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-blue-500'
                    : 'bg-white border-amber-200 text-gray-800 placeholder-gray-400 focus:ring-amber-400 focus:border-amber-400'
                }`}
                placeholder="Add important notes about this customer..."
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 pt-2 justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className={`px-5 py-2.5 rounded-lg font-semibold transition duration-200 flex items-center gap-2 active:scale-95 ${
                  darkMode
                    ? 'bg-gray-600 text-gray-100 hover:bg-gray-500'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <CloseIcon size={16} />
                Close
              </button>
              <button
                onClick={handleSaveNote}
                className={`px-5 py-2.5 rounded-lg text-white font-semibold transition duration-200 shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95 ${
                  darkMode
                    ? 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                }`}
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CustomerTable;
