import React, { useState, useRef } from 'react';
import { UploadCloud, X, FileText, FileSpreadsheet } from 'lucide-react';
import Loading from '../Common/Loading';

const FileUpload = ({ onFileSelect, onSubmit, loading = false }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState([]);
  const [showFileCard, setShowFileCard] = useState(true);

  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (file) => {
    const lower = file.name.toLowerCase();
    const isCSV = file.type === 'text/csv' || lower.endsWith('.csv');
    const isXLSX = lower.endsWith('.xlsx') || lower.endsWith('.xls');

    if (!isCSV && !isXLSX) {
      alert('Please select a CSV or Excel file (.csv, .xlsx, .xls)');
      return;
    }

    setFile(file);
    setShowFileCard(true); // <-- tampilkan card lagi kalau user upload file baru
    onFileSelect(file);

    if (isCSV) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const lines = e.target.result
          .split('\n')
          .filter((l) => l.trim())
          .slice(0, 6);

        setPreview(lines.map((line) => line.split(',').map((c) => c.trim())));
      };
      reader.readAsText(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const XLSX = await import('xlsx');
        const workbook = XLSX.read(e.target.result, { type: 'array' });
        const sheet = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]],
          { header: 1 }
        );
        setPreview(sheet.slice(0, 6));
      } catch (err) {
        alert('Failed to read Excel file: ' + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleResetFile = () => {
    setFile(null);
    setPreview([]);
    setShowFileCard(false);
  };

  if (loading) return <Loading fullScreen={true} />;

  return (
    <div className="space-y-6 w-full">

      {/* ========================= */}
      {/* UPLOAD AREA (NO FILE)     */}
      {/* ========================= */}
      {!file ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`w-full flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-2xl transition-all ${
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-300'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleChange}
            className="hidden"
          />

          <UploadCloud size={48} className="text-gray-600 mb-3" />

          <p className="text-lg font-medium text-gray-900 mb-1">
            Drag & Drop files here
          </p>
          <p className="text-gray-500 text-sm mb-3">
            or click the button below to browse
          </p>
          <p className="text-xs text-gray-400 mb-4">
            Accepted formats: CSV (.csv) or Excel (.xlsx, .xls)
          </p>

          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium transition"
          >
            Select File
          </button>
        </div>
      ) : (
        <>
          {/* ========================= */}
          {/* FILE INFO CARD            */}
          {/* ========================= */}
          {showFileCard && (
            <div className="flex items-center justify-between p-3 bg-white border border-gray-200/70 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 min-w-0">
                {file.name.endsWith('.csv') ? (
                  <FileText size={30} className="text-primary-500" />
                ) : (
                  <FileSpreadsheet size={30} className="text-primary-500" />
                )}

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Selected File</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              {/* Tombol X hanya menyembunyikan card */}
              <button
                onClick={() => setShowFileCard(false)}
                className="p-2 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600 transition"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* ========================= */}
          {/* PREVIEW TABLE             */}
          {/* ========================= */}
          {preview.length > 0 && (
            <div className="overflow-x-auto border rounded-xl mt-3 shadow-sm">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    {preview[0].map((cell, i) => (
                      <th
                        key={i}
                        className="px-3 py-2 text-left border-b font-semibold text-gray-900"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {preview.slice(1).map((row, ri) => (
                    <tr key={ri} className="border-b hover:bg-gray-50">
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 text-gray-700">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ========================= */}
          {/* ACTION BUTTONS           */}
          {/* ========================= */}
          <div className="flex gap-3 mt-4 w-full justify-end">
            <button
              onClick={() => onSubmit(file)}
              disabled={loading}
              className="px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition"
            >
              {loading ? 'Processing...' : 'Prediction'}
            </button>

            <button
              onClick={handleResetFile}
              className="px-5 py-2 border border-gray-300 hover:bg-gray-100 rounded-lg font-medium transition"
            >
              Remove File
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
