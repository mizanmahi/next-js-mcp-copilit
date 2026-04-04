import Breadcrumb from '@/components/dashboard/Breadcrumb';
import { FileText, Download, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const reports = [
  {
    id: 'RPT-001',
    name: 'Monthly Traffic Summary',
    generated: 'Mar 01, 2026',
    status: 'Ready',
    size: '2.4 MB',
  },
  {
    id: 'RPT-002',
    name: 'User Acquisition Report',
    generated: 'Feb 28, 2026',
    status: 'Ready',
    size: '1.8 MB',
  },
  {
    id: 'RPT-003',
    name: 'Conversion Funnel Analysis',
    generated: 'Feb 20, 2026',
    status: 'Processing',
    size: '—',
  },
  {
    id: 'RPT-004',
    name: 'Quarterly Revenue Breakdown',
    generated: 'Feb 15, 2026',
    status: 'Ready',
    size: '3.1 MB',
  },
  {
    id: 'RPT-005',
    name: 'Churn Rate Analysis',
    generated: 'Feb 10, 2026',
    status: 'Failed',
    size: '—',
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  Ready: { label: 'Ready', color: 'bg-green-50 text-green-700', icon: CheckCircle },
  Processing: { label: 'Processing', color: 'bg-yellow-50 text-yellow-700', icon: Clock },
  Failed: { label: 'Failed', color: 'bg-red-50 text-red-600', icon: AlertCircle },
};

export default function ReportsPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Breadcrumb />
        <div className="mt-3 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and download your generated analytics reports.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            <FileText size={15} />
            Generate Report
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {[
          { label: 'Total Reports', value: reports.length, color: 'text-blue-600 bg-blue-50' },
          { label: 'Ready', value: reports.filter(r => r.status === 'Ready').length, color: 'text-green-600 bg-green-50' },
          { label: 'Processing', value: reports.filter(r => r.status === 'Processing').length, color: 'text-yellow-600 bg-yellow-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
            <p className={`text-3xl font-bold ${s.color.split(' ')[0]}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <FileText size={16} className="text-purple-500" />
          <h2 className="text-base font-semibold text-gray-800">All Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Report Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <span className="flex items-center gap-1"><Calendar size={12} />Generated</span>
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Size</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reports.map(report => {
                const cfg = statusConfig[report.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5 font-mono text-xs text-gray-500">{report.id}</td>
                    <td className="px-6 py-3.5 font-medium text-gray-800">{report.name}</td>
                    <td className="px-6 py-3.5 text-gray-500">{report.generated}</td>
                    <td className="px-6 py-3.5">
                      <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
                        <StatusIcon size={11} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-gray-500 text-xs">{report.size}</td>
                    <td className="px-6 py-3.5">
                      {report.status === 'Ready' ? (
                        <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors">
                          <Download size={13} />
                          Download
                        </button>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
