import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import FileUpload from '@/components/DataInput/FileUpload';
import SingleCustomerForm from '@/components/DataInput/SingleCustomerForm';
import PredictionResultModal from '@/components/DataInput/PredictionResultModal';
import Alert from '@/components/Common/Alert';
import { useTheme } from '@/context/ThemeContext.jsx';
import { importService, predictionService } from '@/services/index.js';
import { Zap } from 'lucide-react';

const DataInputPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSingleForm, setShowSingleForm] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError('');
  };

  const handleBatchSubmit = async (file) => {
    if (!file) {
      setError('Please Select A File First.');
      return;
    }
    try {
      setLoading(true);
      const response = await importService.uploadFile(file);
      setSuccess('File Uploaded Successfully! Data Is Being Scored...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed To Upload File.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSingleSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await predictionService.predictSingleCustomer(formData);
      setPredictionResult(response);
      setShowSingleForm(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Prediction failed. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

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
            Data Import & Scoring
          </h1>
        </div>

        {/* Alerts */}
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setShowSingleForm(true)}
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition flex items-center gap-2 shadow-lg"
          >
            <Zap size={18} />
            Quick Prediction
          </button>
        </div>

        {/* Upload Section */}
        <div className="w-full overflow-x-hidden">
          <FileUpload
            onFileSelect={handleFileSelect}
            onSubmit={handleBatchSubmit}
            loading={loading}
          />
        </div>


      </div>

      {/* Single Customer Form Modal */}
      {showSingleForm && (
        <SingleCustomerForm
          onClose={() => {
            setShowSingleForm(false);
            setError('');
          }}
          onSubmit={handleSingleSubmit}
          loading={loading}
        />
      )}

      {/* Prediction Result Modal */}
      {predictionResult && (
        <PredictionResultModal
          result={predictionResult}
          onClose={() => setPredictionResult(null)}
        />
      )}
    </MainLayout>
  );
};

export default DataInputPage;
