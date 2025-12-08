import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth.jsx';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleGoHome = () => {
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-red-100 rounded-full p-4">
            <AlertCircle className="w-16 h-16 text-red-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Only administrators can view this section.
        </p>

        {/* Details */}
        <div className="bg-white rounded-lg border border-red-200 p-4 mb-6">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-red-600">Error Code:</span> 403 - Forbidden
          </p>
          <p className="text-sm text-gray-600 mt-2">
            If you believe this is a mistake, please contact your administrator.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            <Home className="w-5 h-5" />
            Go to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Footer Help */}
        <p className="text-xs text-gray-500 mt-6">
          Need help? Contact support at support@example.com
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
