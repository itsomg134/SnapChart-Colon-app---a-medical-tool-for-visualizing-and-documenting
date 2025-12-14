import React, { useState } from 'react';
import { Camera, Save, Trash2, Download, FileText } from 'lucide-react';

const ColonApp = () => {
  const [findings, setFindings] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'polyp',
    size: '',
    description: ''
  });

  const segments = [
    { id: 'rectum', name: 'Rectum', x: 400, y: 520, color: '#ef4444' },
    { id: 'sigmoid', name: 'Sigmoid', x: 350, y: 450, color: '#f97316' },
    { id: 'descending', name: 'Descending', x: 280, y: 350, color: '#f59e0b' },
    { id: 'splenic', name: 'Splenic Flexure', x: 280, y: 250, color: '#eab308' },
    { id: 'transverse', name: 'Transverse', x: 400, y: 200, color: '#84cc16' },
    { id: 'hepatic', name: 'Hepatic Flexure', x: 520, y: 250, color: '#22c55e' },
    { id: 'ascending', name: 'Ascending', x: 520, y: 350, color: '#10b981' },
    { id: 'cecum', name: 'Cecum', x: 520, y: 450, color: '#14b8a6' }
  ];

  const findingTypes = [
    { value: 'polyp', label: 'Polyp', color: '#ef4444' },
    { value: 'inflammation', label: 'Inflammation', color: '#f97316' },
    { value: 'diverticulum', label: 'Diverticulum', color: '#8b5cf6' },
    { value: 'bleeding', label: 'Bleeding', color: '#dc2626' },
    { value: 'mass', label: 'Mass', color: '#7c3aed' },
    { value: 'normal', label: 'Normal', color: '#10b981' }
  ];

  const handleSegmentClick = (segment) => {
    setSelectedSegment(segment);
    setShowForm(true);
  };

  const handleAddFinding = () => {
    if (selectedSegment && formData.type) {
      const newFinding = {
        id: Date.now(),
        segment: selectedSegment,
        ...formData,
        timestamp: new Date().toLocaleString()
      };
      setFindings([...findings, newFinding]);
      setShowForm(false);
      setFormData({ type: 'polyp', size: '', description: '' });
      setSelectedSegment(null);
    }
  };

  const handleDeleteFinding = (id) => {
    setFindings(findings.filter(f => f.id !== id));
  };

  const generateReport = () => {
    let report = 'COLONOSCOPY FINDINGS REPORT\n';
    report += '=' .repeat(50) + '\n\n';
    report += `Date: ${new Date().toLocaleDateString()}\n\n`;
    
    segments.forEach(seg => {
      const segFindings = findings.filter(f => f.segment.id === seg.id);
      if (segFindings.length > 0) {
        report += `${seg.name.toUpperCase()}:\n`;
        segFindings.forEach(f => {
          report += `  • ${f.type.charAt(0).toUpperCase() + f.type.slice(1)}`;
          if (f.size) report += ` (${f.size}mm)`;
          if (f.description) report += `: ${f.description}`;
          report += '\n';
        });
        report += '\n';
      }
    });
    
    if (findings.length === 0) {
      report += 'No findings documented.\n';
    }
    
    return report;
  };

  const downloadReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `colonoscopy-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Camera className="w-8 h-8" />
                <h1 className="text-3xl font-bold">SnapChart Colon</h1>
              </div>
              <button
                onClick={downloadReport}
                disabled={findings.length === 0}
                className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
            <p className="mt-2 text-blue-100">Interactive colonoscopy documentation tool</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Colon Diagram */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Colon Map
              </h2>
              <svg viewBox="0 0 800 600" className="w-full h-auto border-2 border-gray-200 rounded-lg bg-white">
                {/* Colon Path */}
                <path
                  d="M 400 540 Q 350 480 350 420 L 350 320 Q 350 260 300 230 Q 250 200 300 170 L 500 170 Q 550 200 500 230 Q 450 260 450 320 L 450 420 Q 450 480 500 420 L 500 480"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="60"
                  strokeLinecap="round"
                />
                
                {/* Segments */}
                {segments.map(seg => {
                  const segmentFindings = findings.filter(f => f.segment.id === seg.id);
                  const hasFinding = segmentFindings.length > 0;
                  
                  return (
                    <g key={seg.id}>
                      <circle
                        cx={seg.x}
                        cy={seg.y}
                        r="40"
                        fill={hasFinding ? '#fef3c7' : seg.color}
                        stroke={hasFinding ? '#f59e0b' : '#1e293b'}
                        strokeWidth="3"
                        className="cursor-pointer hover:opacity-80 transition"
                        onClick={() => handleSegmentClick(seg)}
                      />
                      <text
                        x={seg.x}
                        y={seg.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs font-semibold fill-white pointer-events-none"
                      >
                        {seg.name.split(' ')[0]}
                      </text>
                      {hasFinding && (
                        <circle
                          cx={seg.x + 25}
                          cy={seg.y - 25}
                          r="12"
                          fill="#dc2626"
                          stroke="white"
                          strokeWidth="2"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
              <p className="text-sm text-gray-600 mt-3 text-center">Click on any segment to add findings</p>
            </div>

            {/* Findings Panel */}
            <div className="space-y-4">
              {/* Input Form */}
              {showForm && selectedSegment && (
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Add Finding: {selectedSegment.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Finding Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      >
                        {findingTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Size (mm)
                      </label>
                      <input
                        type="number"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        placeholder="Enter size in mm"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Additional notes..."
                        rows="3"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleAddFinding}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        <Save className="w-4 h-4" />
                        Save Finding
                      </button>
                      <button
                        onClick={() => {
                          setShowForm(false);
                          setSelectedSegment(null);
                          setFormData({ type: 'polyp', size: '', description: '' });
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Findings List */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Documented Findings ({findings.length})
                </h3>
                
                {findings.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No findings documented yet. Click on a segment to add findings.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {findings.map(finding => {
                      const typeInfo = findingTypes.find(t => t.value === finding.type);
                      return (
                        <div
                          key={finding.id}
                          className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: typeInfo.color }}
                                />
                                <span className="font-bold text-gray-800">
                                  {finding.segment.name}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                <span className="font-semibold">{typeInfo.label}</span>
                                {finding.size && ` • ${finding.size}mm`}
                              </p>
                              {finding.description && (
                                <p className="text-sm text-gray-600 mt-1">{finding.description}</p>
                              )}
                              <p className="text-xs text-gray-400 mt-1">{finding.timestamp}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteFinding(finding.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColonApp;