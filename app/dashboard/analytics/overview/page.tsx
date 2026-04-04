import Breadcrumb from '@/components/dashboard/Breadcrumb';
import { TrendingUp, ArrowUp, ArrowDown, Eye, MousePointer } from 'lucide-react';

const metrics = [
  { label: 'Page Views', value: '84,230', change: '+18%', positive: true },
  { label: 'Unique Visitors', value: '31,450', change: '+11%', positive: true },
  { label: 'Bounce Rate', value: '38.4%', change: '-2.1%', positive: true },
  { label: 'Avg. Time on Page', value: '4m 22s', change: '-0.3%', positive: false },
];

const topPages = [
  { path: '/home', views: 24300, clicks: 4100 },
  { path: '/pricing', views: 18200, clicks: 3800 },
  { path: '/docs', views: 14700, clicks: 2900 },
  { path: '/blog', views: 12400, clicks: 2100 },
  { path: '/about', views: 9100, clicks: 1600 },
];

export default function OverviewPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Breadcrumb />
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Analytics Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          A high-level snapshot of your platform&apos;s performance metrics.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {metrics.map(m => (
          <div
            key={m.label}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{m.label}</p>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${m.positive ? 'text-green-600' : 'text-red-500'}`}>
                {m.positive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {m.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Top Pages Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <TrendingUp size={16} className="text-blue-500" />
          <h2 className="text-base font-semibold text-gray-800">Top Pages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Page</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <span className="flex items-center gap-1"><Eye size={12} /> Views</span>
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <span className="flex items-center gap-1"><MousePointer size={12} /> Clicks</span>
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {topPages.map(page => (
                <tr key={page.path} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-gray-700 text-xs">{page.path}</td>
                  <td className="px-6 py-3.5 text-gray-700">{page.views.toLocaleString()}</td>
                  <td className="px-6 py-3.5 text-gray-700">{page.clicks.toLocaleString()}</td>
                  <td className="px-6 py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                      {((page.clicks / page.views) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
