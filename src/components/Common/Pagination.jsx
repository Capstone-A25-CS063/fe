import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';

/**
 * Pagination Component - Two-sided layout
 * Left: Page info | Right: Navigation buttons
 *
 * Props:
 * - total: number (total items across all pages)
 * - currentPage: number (current active page)
 * - limit: number (items per page)
 * - onPageChange: function (callback when page changes)
 * - isLoading: boolean (show loading state)
 */
const Pagination = ({
  total = 0,
  currentPage = 1,
  limit = 20,
  onPageChange = () => {},
  isLoading = false,
}) => {
  const totalPages = Math.ceil(total / limit) || 1;
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  const isPrevDisabled = currentPage === 1 || isLoading;
  const isNextDisabled = currentPage === totalPages || isLoading;

  // Generate page numbers to display (show ~5 around current)
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const { darkMode } = useTheme();

  return (
    <div className={`flex items-center justify-between mt-6 p-4 rounded-lg gap-4 transition-colors ${
      darkMode
        ? 'bg-gray-700 border border-gray-600'
        : 'bg-gray-50'
    }`}>
      {/* LEFT: Info Text */}
      <div className={`text-sm ${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Showing <span className="font-semibold">{startItem}</span> to{' '}
        <span className="font-semibold">{endItem}</span> of{' '}
        <span className="font-semibold">{total}</span> items
      </div>

      {/* RIGHT: Pagination Controls */}
      <div className="flex items-center gap-3">
        {/* Page Info */}
        <span className={`text-sm font-medium ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Page <span className={`font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>{currentPage}</span> of{' '}
          <span className={`font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>{totalPages}</span>
        </span>

        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isPrevDisabled}
          className={`p-1.5 rounded-md border transition-colors ${
            darkMode
              ? 'border-gray-600 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
              : 'border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
          title="Previous page"
        >
          <ChevronLeft size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
        </button>

        {/* Page Numbers */}
        <div className="flex gap-1">
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              className={`px-2.5 py-1 rounded-md text-sm transition-colors ${
                page === currentPage
                  ? 'bg-blue-500 text-white font-semibold'
                  : darkMode
                  ? 'border border-gray-600 text-gray-300 hover:bg-gray-600 disabled:cursor-not-allowed'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isNextDisabled}
          className={`p-1.5 rounded-md border transition-colors ${
            darkMode
              ? 'border-gray-600 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
              : 'border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
          title="Next page"
        >
          <ChevronRight size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
