import React from 'react';
import { X, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';

const PredictionResultModal = ({ result, onClose }) => {
  const { darkMode } = useTheme();
  
  if (!result) return null;

  const { nasabah, hasil_analisis, data_ekonomi_digunakan } = result;
  const scorePercent = parseFloat(hasil_analisis.skor_potensi);

  // Determine score color
  let scoreColor = 'text-red-600';
  let scoreBgColor = darkMode ? 'bg-red-900/30 border border-red-700' : 'bg-red-100';
  let scoreLabel = 'Low';

  if (scorePercent >= 67) {
    scoreColor = 'text-green-600';
    scoreBgColor = darkMode ? 'bg-green-900/30 border border-green-700' : 'bg-green-100';
    scoreLabel = 'High';
  } else if (scorePercent >= 34) {
    scoreColor = 'text-yellow-600';
    scoreBgColor = darkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-100';
    scoreLabel = 'Medium';
  }

  // Determine recommendation color
  const isPositive = hasil_analisis.rekomendasi.includes('HUBUNGI SEGERA');
  const isWarning = hasil_analisis.rekomendasi.includes('HATI-HATI');

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors ${
        darkMode
          ? 'bg-gray-800'
          : 'bg-white'
      }`}>
        
        {/* HEADER */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 p-6 flex items-center justify-between rounded-t-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle size={28} className="text-green-100" />
            <div>
              <h2 className="text-2xl font-bold text-white">Prediction Result</h2>
              <p className="text-green-100 text-sm mt-1">Lead scoring analysis complete</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-green-800 rounded-lg transition text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className={`p-6 space-y-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          
          {/* CUSTOMER INFO */}
          <div className={`p-5 rounded-xl border ${
            darkMode
              ? 'bg-blue-900/20 border-blue-700'
              : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
          }`}>
            <h3 className={`text-sm font-bold mb-4 ${
              darkMode ? 'text-blue-400' : 'text-gray-800'
            }`}>Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-xs uppercase font-semibold ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Name</p>
                <p className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>{nasabah.nama || 'N/A'}</p>
              </div>
              <div>
                <p className={`text-xs uppercase font-semibold ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Phone</p>
                <p className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>{nasabah.telepon || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* SCORE & RECOMMENDATION */}
          <div className={`p-5 rounded-xl border ${
            darkMode
              ? 'bg-purple-900/20 border-purple-700'
              : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
          }`}>
            <h3 className={`text-sm font-bold mb-4 flex items-center gap-2 ${
              darkMode ? 'text-purple-400' : 'text-gray-800'
            }`}>
              <TrendingUp size={16} />
              Analysis Result
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Score */}
              <div className={`p-5 rounded-lg ${scoreBgColor}`}>
                <p className={`text-xs uppercase font-semibold mb-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Lead Score</p>
                <div className="flex items-baseline gap-2">
                  <p className={`text-4xl font-bold ${scoreColor}`}>
                    {scorePercent.toFixed(1)}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>%</p>
                </div>
                <p className={`text-sm font-semibold mt-2 ${scoreColor}`}>{scoreLabel}</p>
              </div>

              {/* Recommendation */}
              <div className={`p-5 rounded-lg ${
                isPositive ? (darkMode ? 'bg-green-900/30 border border-green-700' : 'bg-green-100 border border-green-300') :
                isWarning ? (darkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-100 border border-yellow-300') :
                (darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-100 border border-gray-300')
              }`}>
                <p className={`text-xs uppercase font-semibold mb-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Recommendation</p>
                <p className={`text-lg font-bold ${
                  isPositive ? 'text-green-500' :
                  isWarning ? 'text-yellow-500' :
                  (darkMode ? 'text-gray-300' : 'text-gray-700')
                }`}>
                  {hasil_analisis.rekomendasi}
                </p>
              </div>
            </div>
          </div>

          {/* NOTES */}
          {hasil_analisis.catatan_penting && hasil_analisis.catatan_penting.length > 0 && (
            <div className={`p-5 rounded-xl border ${
              darkMode
                ? 'bg-amber-900/20 border-amber-700'
                : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
            }`}>
              <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${
                darkMode ? 'text-amber-400' : 'text-gray-800'
              }`}>
                <AlertCircle size={16} />
                Important Notes
              </h3>
              <ul className="space-y-2">
                {hasil_analisis.catatan_penting.map((note, idx) => (
                  <li key={idx} className={`text-sm flex items-start gap-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span className={`font-bold mt-1 ${
                      darkMode ? 'text-amber-400' : 'text-amber-600'
                    }`}>•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ECONOMIC DATA USED */}
          {data_ekonomi_digunakan && Object.keys(data_ekonomi_digunakan).length > 0 && (
            <div className={`p-5 rounded-xl border ${
              darkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
            }`}>
              <h3 className={`text-sm font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>Economic Data Used</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(data_ekonomi_digunakan).map(([key, value]) => (
                  <div key={key} className={`p-3 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-600 border-gray-500'
                      : 'bg-white border-gray-200'
                  }`}>
                    <p className={`text-xs font-semibold uppercase ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{key}</p>
                    <p className={`text-sm font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {typeof value === 'number' ? value.toFixed(2) : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CLOSE BUTTON */}
          <div className={`flex gap-3 pt-4 justify-end border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultModal;
