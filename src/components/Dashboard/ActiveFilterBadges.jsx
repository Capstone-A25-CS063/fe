import React from 'react';
import { X } from 'lucide-react';
import { getFilterDisplayLabel, filterLabelMap } from '@/utils/filterMappings';

const ActiveFilterBadges = ({ filters, basicFilters = {}, onRemoveFilter, onRemoveBasicFilter, onClearAll }) => {
  const activeFilters = [];

  Object.entries(filters).forEach(([filterType, values]) => {
    if (Array.isArray(values) && values.length > 0) {
      values.forEach(value => {
        activeFilters.push({
          type: filterType,
          value,
          display: getFilterDisplayLabel(filterType, value),
          isAdvanced: true,
        });
      });
    }
  });

  const basicFilterLabels = {
    callStatus: 'Call Status',
    decisionStatus: 'Decision Status',
    score: 'Score Status',
  };

  Object.entries(basicFilters).forEach(([filterType, values]) => {
    if (Array.isArray(values) && values.length > 0) {
      values.forEach(value => {
        activeFilters.push({
          type: filterType,
          value,
          display: getFilterDisplayLabel(filterType, value),
          isBasic: true,
          label: basicFilterLabels[filterType],
        });
      });
    }
  });

  if (activeFilters.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex flex-wrap gap-2 items-center">
        {activeFilters.map((filter, idx) => (
          <div
            key={`${filter.type}-${filter.value}-${idx}`}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white ${
              filter.isBasic ? 'bg-blue-500' : 'bg-purple-500'
            }`}
          >
            <span>
              <span className="font-semibold">{filter.label || filterLabelMap[filter.type] || filter.type}:</span>{' '}
              {filter.display}
            </span>
            <button
              onClick={() => {
                if (filter.isBasic && onRemoveBasicFilter) {
                  onRemoveBasicFilter(filter.type, filter.value);
                } else if (filter.isAdvanced && onRemoveFilter) {
                  onRemoveFilter(filter.type, filter.value);
                }
              }}
              className={`rounded-full p-0.5 transition ${
                filter.isBasic ? 'hover:bg-blue-600' : 'hover:bg-purple-600'
              }`}
              title="Remove filter"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {activeFilters.length > 0 && (
          <button
            onClick={onClearAll}
            className="ml-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition"
          >
            ✕ Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveFilterBadges;
