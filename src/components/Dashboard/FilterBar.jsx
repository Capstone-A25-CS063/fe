import React, { useState } from 'react';
import { ChevronDown, Sliders } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';

const FilterBar = ({
  onFilterChange,
  onStatusFilterChange,
  onDecisionFilterChange,
  onScoreFilterChange,
  onJobFilterChange,
  onEducationFilterChange,
  onMaritalFilterChange,
  onPredictionFilterChange,
  onAdvancedFilterClick,
  hasActiveAdvancedFilters = false,
  hasActiveBasicFilters = false,
  onClearAllFilters,
}) => {
  const { darkMode } = useTheme();
  const [statusFilter, setStatusFilter] = useState([]); // tetap array agar tidak merombak UI
  const [interestFilter, setInterestFilter] = useState([]); // tetap array agar mapping button tetap sama
  const [demographyFilter, setDemographyFilter] = useState('');
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [jobFilters, setJobFilters] = useState([]);
  const [educationFilters, setEducationFilters] = useState([]);
  const [maritalFilters, setMaritalFilters] = useState([]);
  const [scoreFilters, setScoreFilters] = useState([]);

  const statusOptions = [
    { value: 'not_called', label: 'Not Called' },
    { value: 'attempted', label: 'Attempted' },
    { value: 'connected', label: 'Connected' },
  ];

  const interestOptions = [
    { value: 'rejected', label: 'Rejected' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
  ];

  const demographyOptions = [
    { value: '', label: 'Semua' },
    { value: 'student', label: 'Pelajar' },
    { value: 'technician', label: 'Teknisi' },
    { value: 'entrepreneur', label: 'Entrepreneur' },
    { value: 'management', label: 'Manajemen' },
    { value: 'retired', label: 'Pensiun' },
  ];

  const jobOptions = [
    { value: 'student', label: 'Pelajar' },
    { value: 'technician', label: 'Teknisi' },
    { value: 'entrepreneur', label: 'Entrepreneur' },
    { value: 'management', label: 'Manajemen' },
    { value: 'retired', label: 'Pensiun' },
    { value: 'professional', label: 'Profesional' },
    { value: 'laborer', label: 'Buruh' },
    { value: 'trader', label: 'Pedagang' },
  ];

  const educationOptions = [
    { value: 'illiterate', label: 'Illiterate' },
    { value: 'elementary', label: 'SD' },
    { value: 'junior_high', label: 'SMP' },
    { value: 'senior_high', label: 'SMA' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelor', label: 'S1' },
    { value: 'master', label: 'S2' },
    { value: 'doctorate', label: 'S3' },
  ];

  const maritalOptions = [
    { value: 'single', label: 'Belum Kawin' },
    { value: 'married', label: 'Kawin' },
    { value: 'divorced', label: 'Cerai' },
  ];

  const scoreOptions = [
    { value: 'high', label: 'High', color: 'bg-green-500 border-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500 border-yellow-500' },
    { value: 'low', label: 'Low', color: 'bg-red-500 border-red-500' },
  ];

  const handleJobFilterChange = (value) => {
    const newFilters = jobFilters.includes(value)
      ? jobFilters.filter((f) => f !== value)
      : [...jobFilters, value];
    setJobFilters(newFilters);
    if (onJobFilterChange) {
      onJobFilterChange(newFilters);
    }
  };

  const handleEducationFilterChange = (value) => {
    const newFilters = educationFilters.includes(value)
      ? educationFilters.filter((f) => f !== value)
      : [...educationFilters, value];
    setEducationFilters(newFilters);
    if (onEducationFilterChange) {
      onEducationFilterChange(newFilters);
    }
  };

  const handleMaritalFilterChange = (value) => {
    const newFilters = maritalFilters.includes(value)
      ? maritalFilters.filter((f) => f !== value)
      : [...maritalFilters, value];
    setMaritalFilters(newFilters);
    if (onMaritalFilterChange) {
      onMaritalFilterChange(newFilters);
    }
  };

  const handleScoreFilterChange = (value) => {
    const newFilters = scoreFilters.includes(value)
      ? scoreFilters.filter((f) => f !== value)
      : [...scoreFilters, value];
    setScoreFilters(newFilters);
    if (onScoreFilterChange) {
      onScoreFilterChange(newFilters);
    }
  };

  /* ========================================================
     STATUS PANGGILAN — SINGLE SELECT
     ========================================================
     - Kalau klik item yg sama → kosongkan (toggle off)
     - Kalau klik item berbeda → ganti jadi satu item saja
  ==========================================================*/
  const toggleStatus = (value) => {
    const newState = statusFilter[0] === value ? [] : [value]; // single select → array berisi satu item
    setStatusFilter(newState);
    onStatusFilterChange(newState);
  };

  /* ========================================================
     STATUS KETERTARIKAN — SINGLE SELECT
     ========================================================
     - Logic sama seperti status panggilan, single option
  ==========================================================*/
  const toggleInterest = (value) => {
    const newState = interestFilter[0] === value ? [] : [value];
    setInterestFilter(newState);
    if (onDecisionFilterChange) {
      onDecisionFilterChange(newState);
    } else {
      onStatusFilterChange(newState);
    }
  };

  const handleScoreChange = (value) => {
    setScoreRange([0, value]);
    onScoreFilterChange([0, value]);
  };

  return (
    <div className={`p-6 rounded-xl shadow-md mb-6 transition-colors ${
      darkMode
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-bold ${
          darkMode ? 'text-white' : 'text-gray-700'
        }`}>Filter</h3>
        <div className="flex gap-2">
          {(hasActiveAdvancedFilters || hasActiveBasicFilters) && (
            <button
              onClick={onClearAllFilters}
              className="px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 bg-red-500 text-white hover:bg-red-600"
            >
              ✕ Clear All
            </button>
          )}
          <button
            onClick={onAdvancedFilterClick}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              hasActiveAdvancedFilters
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:from-purple-700 hover:to-purple-800'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800'
            }`}
          >
            <Sliders size={16} />
            Advanced Filters {hasActiveAdvancedFilters && '✓'}
          </button>
        </div>
      </div>

      {/* ADVANCED FILTERS - COLLAPSIBLE (AT TOP) */}
      {false && (
        <div className="border-b pb-6 mb-6 space-y-6">
          <h4 className="text-md font-semibold text-gray-700">Demographics & Additional Filters</h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* JOB FILTER */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Job
              </label>
              <div className="grid grid-cols-2 gap-2">
                {jobOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleJobFilterChange(opt.value)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border
                      ${
                        jobFilters.includes(opt.value)
                          ? 'bg-blue-500 text-white shadow-md border-blue-500'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* EDUCATION FILTER */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Education
              </label>
              <div className="grid grid-cols-2 gap-2">
                {educationOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleEducationFilterChange(opt.value)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border
                      ${
                        educationFilters.includes(opt.value)
                          ? 'bg-green-500 text-white shadow-md border-green-500'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* MARITAL FILTER */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Marital Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {maritalOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleMaritalFilterChange(opt.value)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border
                      ${
                        maritalFilters.includes(opt.value)
                          ? 'bg-purple-500 text-white shadow-md border-purple-500'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BASIC FILTERS - ALWAYS VISIBLE */}
      <div className="space-y-6">
        {/* THREE-COLUMN LAYOUT: CALL STATUS, DECISION STATUS, PREDICTION STATUS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CALL STATUS */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Call Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => toggleStatus(opt.value)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-all border ${
                    statusFilter.includes(opt.value)
                      ? 'bg-primary-500 text-white shadow-md border-primary-500'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* DECISION STATUS */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Decision Status
              {!statusFilter.includes('connected') && (
                <span className={`text-xs font-normal ml-2 ${
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>(Only if Connected)</span>
              )}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {interestOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => toggleInterest(opt.value)}
                  disabled={!statusFilter.includes('connected')}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-all border ${
                    !statusFilter.includes('connected')
                      ? darkMode
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-600 opacity-50'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                      : interestFilter.includes(opt.value)
                      ? 'bg-primary-500 text-white shadow-md border-primary-500'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* SCORE STATUS */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Score Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {scoreOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleScoreFilterChange(opt.value)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-all border ${
                    scoreFilters.includes(opt.value)
                      ? `${opt.color} text-white shadow-md`
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
