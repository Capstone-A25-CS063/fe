import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Sliders, Calendar, Briefcase, GraduationCap, Heart, Home, DollarSign } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';
import {
  jobCategoryMapping,
  educationMapping,
  maritalMapping,
  ageRanges,
  booleanFilterOptions,
} from '@/utils/filterMappings';

const AdvancedFilterModal = ({
  isOpen,
  onClose,
  onApply,
  initialFilters = {},
}) => {
  const { darkMode } = useTheme();
  const [filters, setFilters] = useState({
    age: initialFilters.age || [],
    job: initialFilters.job || [],
    education: initialFilters.education || [],
    marital: initialFilters.marital || [],
    housing: initialFilters.housing || [],
    loan: initialFilters.loan || [],
  });

  // Handle checkbox toggle for multi-select filters
  const toggleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value],
    }));
  };

  // Reset all filters to initial state
  const handleReset = () => {
    setFilters({
      age: initialFilters.age || [],
      job: initialFilters.job || [],
      education: initialFilters.education || [],
      marital: initialFilters.marital || [],
      housing: initialFilters.housing || [],
      loan: initialFilters.loan || [],
    });
  };

  // Apply filters and close modal
  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!isOpen) return null;

  // Helper component for filter sections
  const FilterSection = ({ icon: Icon, title, children }) => (
    <div className={`rounded-xl p-5 border transition ${
      darkMode
        ? 'bg-gray-700 border-gray-600 hover:border-blue-500'
        : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-blue-300'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-2 rounded-lg ${
          darkMode
            ? 'bg-blue-900/30'
            : 'bg-blue-100'
        }`}>
          <Icon size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
        </div>
        <h3 className={`text-base font-semibold ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>{title}</h3>
      </div>
      {children}
    </div>
  );

  const CheckboxOption = ({ label, checked, onChange }) => (
    <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition group ${
      darkMode
        ? 'bg-gray-600 border-gray-500 hover:bg-gray-500 hover:border-blue-400'
        : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'
    }`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-400 cursor-pointer"
      />
      <span className={`ml-3 text-sm font-medium transition ${
        darkMode
          ? 'text-gray-200 group-hover:text-blue-400'
          : 'text-gray-700 group-hover:text-blue-700'
      }`}>{label}</span>
    </label>
  );

  if (!isOpen) return null;

  return (
    <>
      {isOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className={`rounded-2xl shadow-2xl w-11/12 max-w-3xl max-h-[90vh] overflow-hidden flex flex-col transition-colors ${
            darkMode
              ? 'bg-gray-800'
              : 'bg-white'
          }`}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-6 py-5 flex justify-between items-center z-10 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Sliders size={22} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Advanced Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-blue-500 rounded-lg transition duration-200 group"
          >
            <X size={24} className="text-white group-hover:scale-110 transition" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* Age Range Filter */}
          <FilterSection icon={Calendar} title="Age Range">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {ageRanges.map(range => (
                <CheckboxOption
                  key={range.id}
                  label={range.label}
                  checked={filters.age.includes(range.id)}
                  onChange={() => toggleFilter('age', range.id)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Job Category Filter */}
          <FilterSection icon={Briefcase} title="Job Category">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.keys(jobCategoryMapping).map(job => (
                <CheckboxOption
                  key={job}
                  label={job}
                  checked={filters.job.includes(job)}
                  onChange={() => toggleFilter('job', job)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Education Level Filter */}
          <FilterSection icon={GraduationCap} title="Education Level">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.keys(educationMapping).map(education => (
                <CheckboxOption
                  key={education}
                  label={education}
                  checked={filters.education.includes(education)}
                  onChange={() => toggleFilter('education', education)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Marital Status Filter */}
          <FilterSection icon={Heart} title="Marital Status">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.keys(maritalMapping).map(status => (
                <CheckboxOption
                  key={status}
                  label={status}
                  checked={filters.marital.includes(status)}
                  onChange={() => toggleFilter('marital', status)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Housing Filter */}
          <FilterSection icon={Home} title="Housing">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {booleanFilterOptions.map(option => (
                <CheckboxOption
                  key={option.value}
                  label={option.label}
                  checked={filters.housing.includes(option.value)}
                  onChange={() => toggleFilter('housing', option.value)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Loan Filter */}
          <FilterSection icon={DollarSign} title="Loan">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {booleanFilterOptions.map(option => (
                <CheckboxOption
                  key={option.value}
                  label={option.label}
                  checked={filters.loan.includes(option.value)}
                  onChange={() => toggleFilter('loan', option.value)}
                />
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Footer - Action Buttons */}
        <div className={`sticky bottom-0 px-6 py-4 flex gap-3 justify-end border-t transition-colors ${
          darkMode
            ? 'bg-gray-700 border-gray-600'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <button
            onClick={handleReset}
            className={`px-6 py-2.5 font-semibold rounded-lg transition duration-200 hover:shadow-md active:scale-95 ${
              darkMode
                ? 'bg-gray-600 hover:bg-gray-500 text-gray-100'
                : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
            }`}
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition duration-200 hover:shadow-lg active:scale-95"
          >
            Apply Filters
          </button>
        </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default AdvancedFilterModal;
