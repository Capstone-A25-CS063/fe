import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowDown, Search, X } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import PieChart from '@/components/Dashboard/PieChart';
import BarChartComponent from '@/components/Dashboard/BarChart';
import FilterBar from '@/components/Dashboard/FilterBar';
import CustomerTable from '@/components/Dashboard/CustomerTable';
import Loading from '@/components/Common/Loading';
import Alert from '@/components/Common/Alert';
import Pagination from '@/components/Common/Pagination';
import Statistic from '@/components/Dashboard/Statistic';
import AdvancedFilterModal from '@/components/Dashboard/AdvancedFilterModal';
import ActiveFilterBadges from '@/components/Dashboard/ActiveFilterBadges';
import { useTheme } from '@/context/ThemeContext.jsx';
import { customerService } from '@/services/index.js';
import { applyAdvancedFilters, hasActiveAdvancedFilters } from '@/utils/advancedFilterLogic';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [pageSize] = useState(20); // Items per page
  const [customers, setCustomers] = useState([]); // Data halaman saat ini
  const [allCustomers, setAllCustomers] = useState([]); // All customers for filtering
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = highest first, 'asc' = lowest first
  const [skip, setSkip] = useState(0); // Track skip value for ranking
  const [callStatusFilter, setCallStatusFilter] = useState([]);
  const [decisionStatusFilter, setDecisionStatusFilter] = useState([]);
  const [jobFilter, setJobFilter] = useState([]);
  const [educationFilter, setEducationFilter] = useState([]);
  const [maritalFilter, setMaritalFilter] = useState([]);
  const [scoreFilter, setScoreFilter] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Advanced filters
  const [advancedFilters, setAdvancedFilters] = useState({
    age: [],
    job: [],
    education: [],
    marital: [],
    housing: [],
    loan: [],
  });
  const [isAdvancedFilterModalOpen, setIsAdvancedFilterModalOpen] = useState(false);

  useEffect(() => {
    fetchAllCustomers();
  }, []); // Fetch all customers once on mount

  useEffect(() => {
    if (allCustomers.length > 0) {
      // Re-apply filters when sort order changes
      applyFilters(callStatusFilter, decisionStatusFilter, jobFilter, educationFilter, maritalFilter, scoreFilter, searchKeyword, null, false, sortOrder);
    }
  }, [sortOrder]); // Re-filter when sort order changes

  const fetchAllCustomers = async () => {
    try {
      setLoading(true);
      console.log(`📊 Fetching ALL customers with limit 2000 for filtering`);
      const response = await customerService.getAllCustomers({
        page: 1,
        limit: 2000, // Fetch all customers (1106 available)
        sortOrder: 'desc'
      });

      const allData = response?.data || [];
      const validData = Array.isArray(allData) ? allData : [];

      console.log(`✅ Loaded ${validData.length} customers for global filtering`);
      // Debug: show unique prediction values
      const uniquePredictions = [...new Set(validData.map(c => c.prediction))];
      console.log(`📊 Unique prediction values in database:`, uniquePredictions);
      setAllCustomers(validData);
      setFilteredCustomers(validData);
      setTotalCustomers(response?.total || 0);
      setError('');
    } catch (err) {
      setError(err?.message || 'Failed to load customers');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async (page) => {
    try {
      setPageLoading(page === currentPage ? false : true);
      console.log(`📊 Fetching customers - Page: ${page}, Limit: ${pageSize}, Sort: ${sortOrder}`);
      
      const response = await customerService.getAllCustomers({ 
        page, 
        limit: pageSize,
        sortOrder: sortOrder // Pass sort order to backend
      });
      
      console.log('✅ Response:', {
        total: response?.total,
        page: response?.page,
        count: response?.count,
        skip: response?.skip,
        sortOrder: response?.sortOrder,
        dataLength: response?.data?.length
      });

      const pageData = response?.data || [];
      const sorted = Array.isArray(pageData) ? pageData : [];

      console.log('📌 Setting skip:', response?.skip, 'for', sorted.length, 'items');

      setCustomers(sorted);
      setFilteredCustomers(sorted);
      setTotalCustomers(response?.total || 0);
      setCurrentPage(page);
      setSkip(response?.skip || 0); // Store skip for ranking
      setError('');
    } catch (err) {
      setError(err?.message || 'Failed to fetch customers');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  const handleStatusFilterChange = (filters) => {
    setCallStatusFilter(filters);
    applyFilters(filters, decisionStatusFilter, jobFilter, educationFilter, maritalFilter, scoreFilter);
  };

  const handleDecisionFilterChange = (filters) => {
    setDecisionStatusFilter(filters);
    applyFilters(callStatusFilter, filters, jobFilter, educationFilter, maritalFilter, scoreFilter);
  };

  const handleJobFilterChange = (job) => {
    setJobFilter(job);
    applyFilters(callStatusFilter, decisionStatusFilter, job, educationFilter, maritalFilter, scoreFilter);
  };

  const handleEducationFilterChange = (education) => {
    setEducationFilter(education);
    applyFilters(callStatusFilter, decisionStatusFilter, jobFilter, education, maritalFilter, scoreFilter);
  };

  const handleMaritalFilterChange = (marital) => {
    setMaritalFilter(marital);
    applyFilters(callStatusFilter, decisionStatusFilter, jobFilter, educationFilter, marital, scoreFilter);
  };

  const handleScoreFilterChange = (score) => {
    setScoreFilter(score);
    applyFilters(callStatusFilter, decisionStatusFilter, jobFilter, educationFilter, maritalFilter, score, searchKeyword, null, true, sortOrder);
  };

  const handleSearchChange = (keyword) => {
    console.log(`🔍 Search keyword changed to: "${keyword}"`);
    setSearchKeyword(keyword);
    // Re-apply filters with updated search keyword
    applyFilters(callStatusFilter, decisionStatusFilter, jobFilter, educationFilter, maritalFilter, scoreFilter, keyword);
  };

  const applyFilters = (callFilters, decisionFilters, job, education, marital, score, searchKw = '', dataSource = null, resetPage = true, sortBy = sortOrder, advancedFilterData = advancedFilters) => {
    let filtered = [...(dataSource || allCustomers)]; // Use provided dataSource or allCustomers for global filtering

    // Apply Call Status filter
    if (callFilters && callFilters.length > 0) {
      filtered = filtered.filter((customer) => callFilters.includes(customer.callStatus));
    }

    // Apply Decision Status filter (only if callStatus is 'connected')
    if (decisionFilters && decisionFilters.length > 0) {
      filtered = filtered.filter((customer) => {
        if (customer.callStatus === 'connected') {
          return decisionFilters.includes(customer.decisionStatus);
        }
        return true;
      });
    }

    // Apply Job filter (multi-select)
    if (job && job.length > 0) {
      filtered = filtered.filter((customer) => job.includes(customer.job));
    }

    // Apply Education filter (multi-select)
    if (education && education.length > 0) {
      filtered = filtered.filter((customer) => education.includes(customer.education));
    }

    // Apply Marital filter (multi-select)
    if (marital && marital.length > 0) {
      filtered = filtered.filter((customer) => marital.includes(customer.marital));
    }

    // Apply Score filter (high/medium/low based on score percentage)
    if (score && score.length > 0) {
      console.log(`📊 Applying Score filter:`, score);
      filtered = filtered.filter((customer) => {
        const scoreNum = parseFloat(customer.score) || 0;
        let scoreCategory = 'low';  // 0-33%
        if (scoreNum >= 67) scoreCategory = 'high';    // 67-100%
        else if (scoreNum >= 34) scoreCategory = 'medium';  // 34-66%
        return score.includes(scoreCategory);
      });
      console.log(`   After filter: ${filtered.length} customers`);
    }

    // Apply Search keyword filter
    const effectiveKeyword = searchKw !== undefined ? searchKw : searchKeyword;
    if (effectiveKeyword && effectiveKeyword.trim() !== '') {
      const keyword = effectiveKeyword.toLowerCase();
      filtered = filtered.filter((customer) => {
        return (
          (customer.nama_nasabah && customer.nama_nasabah.toLowerCase().includes(keyword)) ||
          (customer.nomor_telepon && customer.nomor_telepon.toLowerCase().includes(keyword)) ||
          (customer.email && customer.email.toLowerCase().includes(keyword)) ||
          (customer.job && customer.job.toLowerCase().includes(keyword)) ||
          (customer.education && customer.education.toLowerCase().includes(keyword)) ||
          (customer.marital && customer.marital.toLowerCase().includes(keyword)) ||
          (customer.usia && customer.usia.toString().includes(keyword))
        );
      });
    }

    // Apply advanced filters
    let finalFiltered = applyAdvancedFilters(filtered, advancedFilterData);

    // Apply sorting by score
    if (sortBy === 'desc') {
      finalFiltered.sort((a, b) => (parseFloat(b.score) || 0) - (parseFloat(a.score) || 0));
    } else if (sortBy === 'asc') {
      finalFiltered.sort((a, b) => (parseFloat(a.score) || 0) - (parseFloat(b.score) || 0));
    }

    // Store full filtered results
    setFilteredCustomers(finalFiltered);

    // Reset to page 1 when filters change (but not when just updating data)
    if (resetPage) {
      setCurrentPage(1);
    }
  };  const handleFilterChange = (filters) => {
    handleStatusFilterChange(filters);
  };

  const handleAdvancedFilterApply = (newAdvancedFilters) => {
    setAdvancedFilters(newAdvancedFilters);
    // Re-apply all filters with new advanced filters - pass newAdvancedFilters directly
    applyFilters(callStatusFilter, decisionStatusFilter, jobFilter, educationFilter, maritalFilter, scoreFilter, searchKeyword, null, true, sortOrder, newAdvancedFilters);
  };

  const handleRemoveAdvancedFilter = (filterType, value) => {
    const updatedFilters = {
      ...advancedFilters,
      [filterType]: advancedFilters[filterType].filter(v => v !== value),
    };
    setAdvancedFilters(updatedFilters);
    // Re-apply filters with updated filters - pass updatedFilters directly
    applyFilters(callStatusFilter, decisionStatusFilter, jobFilter, educationFilter, maritalFilter, scoreFilter, searchKeyword, null, true, sortOrder, updatedFilters);
  };

  const handleRemoveBasicFilter = (filterType, value) => {
    switch (filterType) {
      case 'callStatus':
        const newCallStatus = callStatusFilter.filter(v => v !== value);
        setCallStatusFilter(newCallStatus);
        applyFilters(newCallStatus, decisionStatusFilter, jobFilter, educationFilter, maritalFilter, scoreFilter, searchKeyword, null, true, sortOrder, advancedFilters);
        break;
      case 'decisionStatus':
        const newDecisionStatus = decisionStatusFilter.filter(v => v !== value);
        setDecisionStatusFilter(newDecisionStatus);
        applyFilters(callStatusFilter, newDecisionStatus, jobFilter, educationFilter, maritalFilter, scoreFilter, searchKeyword, null, true, sortOrder, advancedFilters);
        break;
      case 'score':
        const newScore = scoreFilter.filter(v => v !== value);
        setScoreFilter(newScore);
        applyFilters(callStatusFilter, decisionStatusFilter, jobFilter, educationFilter, maritalFilter, newScore, searchKeyword, null, true, sortOrder, advancedFilters);
        break;
      default:
        break;
    }
  };

  const handleClearAllAdvancedFilters = () => {
    const clearedFilters = {
      age: [],
      job: [],
      education: [],
      marital: [],
      housing: [],
      loan: [],
    };
    setAdvancedFilters(clearedFilters);
    applyFilters(callStatusFilter, decisionStatusFilter, jobFilter, educationFilter, maritalFilter, scoreFilter, searchKeyword, null, true, sortOrder, clearedFilters);
  };

  const handleClearAllFilters = () => {
    setCallStatusFilter([]);
    setDecisionStatusFilter([]);
    setJobFilter([]);
    setEducationFilter([]);
    setMaritalFilter([]);
    setScoreFilter([]);
    setSearchKeyword('');
    const clearedAdvancedFilters = {
      age: [],
      job: [],
      education: [],
      marital: [],
      housing: [],
      loan: [],
    };
    setAdvancedFilters(clearedAdvancedFilters);
    applyFilters([], [], [], [], [], [], '', null, true, sortOrder, clearedAdvancedFilters);
  };

  const handleCustomerUpdate = async (updatedCustomer) => {
    try {
      console.log('=== CUSTOMER UPDATE HANDLER ===');
      console.log('📝 Customer ID:', updatedCustomer._id);
      console.log('📝 Full Customer Object:', updatedCustomer);
      
      // Validate customer ID
      if (!updatedCustomer._id) {
        console.error('❌ ERROR: Customer ID is undefined or null!');
        setError('Customer ID is missing. Cannot update.');
        return;
      }

      // Prepare payload with only the status fields
      const payload = {
        callStatus: updatedCustomer.callStatus || '',
        decisionStatus: updatedCustomer.decisionStatus || '',
        catatan: updatedCustomer.catatan || '',
      };

      console.log('📦 PAYLOAD TO SEND:', payload);
      
      // Check for undefined/null values
      Object.entries(payload).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          console.warn(`⚠️ WARNING: Field "${key}" is ${value}`);
        }
      });

      console.log('🚀 Sending update request...');
      const response = await customerService.updateCustomer(updatedCustomer._id, payload);

      console.log('✅ UPDATE SUCCESS - Response:', response);

      // Update allCustomers (master data) with the updated customer
      if (response?.data) {
        const updatedCustomerData = response.data;
        
        const updatedAllCustomers = allCustomers.map((c) =>
          c._id === updatedCustomer._id ? updatedCustomerData : c
        );
        
        setAllCustomers(updatedAllCustomers);
        
        // Re-apply current filters using the UPDATED data (not stale allCustomers from closure)
        applyFilters(callStatusFilter, decisionStatusFilter, jobFilter, educationFilter, maritalFilter, scoreFilter, searchKeyword, updatedAllCustomers, false, sortOrder);

        console.log('📊 State updated - Filters recalculated');
        console.log('  Updated customer:', updatedCustomerData);

        setSuccess('✅ Customer status updated successfully!');
        setError('');        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        console.warn('⚠️ Response has no data field');
        setError('Update response is incomplete');
      }
    } catch (err) {
      console.error('=== UPDATE ERROR ===');
      console.error('Error object:', err);
      console.error('Error message:', err?.message);
      console.error('Response status:', err?.response?.status);
      console.error('Response data:', err?.response?.data);
      
      const errorMessage = err?.response?.data?.message || err?.message || 'Failed to update customer';
      setError(`❌ ${errorMessage}`);
      setSuccess('');
    }
  };

  const handlePageChange = (page) => {
    console.log(`📄 Changing to page: ${page}`);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate paginated customers (slice for current page)
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedCustomers = filteredCustomers.slice(startIdx, endIdx);

  // Calculate chart data
  const callStats = {
    not_called: filteredCustomers.filter((c) => c.callStatus === 'not_called')
      .length,
    attempted: filteredCustomers.filter((c) => c.callStatus === 'attempted').length,
    connected: filteredCustomers.filter((c) => c.callStatus === 'connected').length,
  };

  const interestStats = {
    rejected: filteredCustomers.filter((c) => c.decisionStatus === 'rejected')
      .length,
    pending: filteredCustomers.filter((c) => c.decisionStatus === 'pending')
      .length,
    approved: filteredCustomers.filter((c) => {
      const s = (c.decisionStatus || '').toString().toLowerCase();
      return s === 'approve' || s === 'approved';
    }).length,
  };

  // Score Status Stats - High/Medium/Low
  // Based on score percentage: High >= 67, Medium 34-66, Low < 34
  const scoreStats = {
    bagus: filteredCustomers.filter((c) => {
      const scoreNum = parseFloat(c.score) || 0;
      return scoreNum >= 67;
    }).length,
    sedang: filteredCustomers.filter((c) => {
      const scoreNum = parseFloat(c.score) || 0;
      return scoreNum >= 34 && scoreNum < 67;
    }).length,
    buruk: filteredCustomers.filter((c) => {
      const scoreNum = parseFloat(c.score) || 0;
      return scoreNum < 34;
    }).length,
  };

  console.log('🔍 Score Stats:', scoreStats);
  console.log('🔍 Total filtered:', filteredCustomers.length);
  console.log('🔍 Sample scores:', filteredCustomers.slice(0, 5).map(c => parseFloat(c.score)));

  const callChartData = [
    { name: 'Connected', value: callStats.connected },
    { name: 'Attempted', value: callStats.attempted },
    { name: 'Not Called', value: callStats.not_called },
  ];

  const interestChartData = [
    { name: 'Approved', value: interestStats.approved },
    { name: 'Pending', value: interestStats.pending },
    { name: 'Rejected', value: interestStats.rejected },
  ];

  const callChartColors = ['#34D399', '#60A5FA', '#9CA3AF'];
  const interestChartColors = ['#2DD4BF', '#FBBF24', '#F87171'];

  const scoreChartData = [
    { name: 'High', value: scoreStats.bagus },
    { name: 'Medium', value: scoreStats.sedang },
    { name: 'Low', value: scoreStats.buruk },
  ];
  const scoreChartColors = ['#34D399', '#FBBF24', '#F87171'];

  if (loading) return <Loading fullScreen={true} />;

  return (
    <MainLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Page Header with Gradient */}
        <div className={`rounded-xl p-6 ${
          darkMode
            ? 'bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900'
            : 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600'
        }`}>
          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>
        </div>

        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}

        {success && (
          <Alert type="success" message={success} onClose={() => setSuccess('')} />
        )}

        {/* STATISTICS (single row on sm+) */}
        <Statistic customers={filteredCustomers} totalCount={totalCustomers} />

        {/* Charts Section */}
        {/* Score Status Bar Chart - Full width */}
        <div className="grid grid-cols-1 gap-6">
          <div className={`rounded-2xl p-6 border transition-colors ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100'
          }`}>
            <BarChartComponent
              data={scoreChartData}
              title={<span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Score Status Segmentation</span>}
              colors={scoreChartColors}
            />
          </div>
        </div>

        {/* Pie Charts - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`rounded-2xl p-6 border transition-colors ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100'
          }`}>
            <PieChart
              data={callChartData}
              title={<span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Call Status</span>}
              colors={callChartColors}
            />
          </div>
          <div className={`rounded-2xl p-6 border transition-colors ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100'
          }`}>
            <PieChart
              data={interestChartData}
              title={<span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Decision Status</span>}
              colors={interestChartColors}
            />
          </div>
        </div>

        {/* Filter */}
        {/* SEARCH BAR */}
      <div className={`mb-6 relative rounded-lg overflow-hidden border transition-colors ${
        darkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-blue-200'
      }`}>
        <Search size={18} className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-blue-400'} pointer-events-none`} />
        <input
          type="text"
          placeholder="Search by name, phone, email, job, education, marital status, or age..."
          value={searchKeyword}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={`w-full pl-12 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            darkMode
              ? 'bg-gray-800 border-0 text-white placeholder-gray-400'
              : 'bg-white border-0 text-gray-900 placeholder-gray-500'
          }`}
        />
        {searchKeyword && (
          <button
            onClick={() => handleSearchChange('')}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition ${
              darkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-400 hover:text-blue-600'
            }`}
            title="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* FILTER BAR */}
      <FilterBar
          onFilterChange={handleFilterChange}
          onStatusFilterChange={handleStatusFilterChange}
          onDecisionFilterChange={handleDecisionFilterChange}
          onJobFilterChange={handleJobFilterChange}
          onEducationFilterChange={handleEducationFilterChange}
          onMaritalFilterChange={handleMaritalFilterChange}
          onScoreFilterChange={handleScoreFilterChange}
          onAdvancedFilterClick={() => setIsAdvancedFilterModalOpen(true)}
          hasActiveAdvancedFilters={hasActiveAdvancedFilters(advancedFilters)}
          hasActiveBasicFilters={callStatusFilter.length > 0 || decisionStatusFilter.length > 0 || scoreFilter.length > 0}
          onClearAllFilters={handleClearAllFilters}
      />

      {/* ACTIVE FILTER BADGES (BASIC + ADVANCED) */}
      {(hasActiveAdvancedFilters(advancedFilters) || callStatusFilter.length > 0 || decisionStatusFilter.length > 0 || scoreFilter.length > 0) && (
        <ActiveFilterBadges
          filters={advancedFilters}
          basicFilters={{
            callStatus: callStatusFilter,
            decisionStatus: decisionStatusFilter,
            score: scoreFilter,
          }}
          onRemoveFilter={handleRemoveAdvancedFilter}
          onRemoveBasicFilter={handleRemoveBasicFilter}
          onClearAll={handleClearAllFilters}
        />
      )}

      {/* ADVANCED FILTER MODAL */}
      <AdvancedFilterModal
        isOpen={isAdvancedFilterModalOpen}
        onClose={() => setIsAdvancedFilterModalOpen(false)}
        onApply={handleAdvancedFilterApply}
        initialFilters={advancedFilters}
      />

        {/* Customer Table */}
        <div>
          <div className="flex items-center justify-between mb-4 p-4 rounded-lg" style={{
            background: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'linear-gradient(135deg, rgba(219, 234, 254, 0.5) 0%, rgba(243, 232, 255, 0.5) 100%)'
          }}>
            <h2 className={`text-xl font-bold ${
              darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Customer List ({paginatedCustomers.length} on this page, {filteredCustomers.length} filtered)
            </h2>

            {/* Sort Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setSortOrder('desc')}
                title="Sort by Highest Score"
                className={`p-2 rounded-lg transition flex items-center gap-2 font-medium ${
                  sortOrder === 'desc'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-white text-gray-700 border border-blue-200 hover:border-blue-300'
                }`}
              >
                <ArrowDown size={18} />
                <span className="hidden sm:inline">Highest</span>
              </button>
              <button
                onClick={() => setSortOrder('asc')}
                title="Sort by Lowest Score"
                className={`p-2 rounded-lg transition flex items-center gap-2 font-medium ${
                  sortOrder === 'asc'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-white text-gray-700 border border-blue-200 hover:border-blue-300'
                }`}
              >
                <ArrowUp size={18} />
                <span className="hidden sm:inline">Lowest</span>
              </button>
            </div>
          </div>

          <CustomerTable
            customers={paginatedCustomers}
            onCustomerSelect={handleCustomerUpdate}
            currentPage={currentPage}
            pageSize={pageSize}
            skip={skip}
          />

          {/* Pagination */}
          {filteredCustomers.length > pageSize && (
            <Pagination
              total={filteredCustomers.length}
              currentPage={currentPage}
              limit={pageSize}
              onPageChange={handlePageChange}
              isLoading={pageLoading}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
