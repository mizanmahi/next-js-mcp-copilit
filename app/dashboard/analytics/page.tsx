import Breadcrumb from '@/components/dashboard/Breadcrumb';
import { TrendingUp, BarChart2, Users, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Breadcrumb />
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Dive deeper into your application metrics and data.
        </p>
      </div>

      {/* Quick links to sub-pages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        <Link
          href="/dashboard/analytics/overview"
          className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <TrendingUp size={20} />
          </div>
          <h3 className="font-semibold text-gray-800">Overview</h3>
          <p className="mt-1 text-sm text-gray-500">
            High-level metrics and key performance indicators.
          </p>
        </Link>

        <Link
          href="/dashboard/analytics/reports"
          className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <BarChart2 size={20} />
          </div>
          <h3 className="font-semibold text-gray-800">Reports</h3>
          <p className="mt-1 text-sm text-gray-500">
            Detailed reports and downloadable insights.
          </p>
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Analytics Summary</h2>
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { label: 'Page Views', value: '84,230', icon: Eye, color: 'text-blue-600' },
            { label: 'Unique Visitors', value: '31,450', icon: Users, color: 'text-green-600' },
            { label: 'Avg. Session', value: '4m 22s', icon: TrendingUp, color: 'text-purple-600' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <Icon size={22} className={item.color} />
                <p className="text-xl font-bold text-gray-900">{item.value}</p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
