import Breadcrumb from '@/components/dashboard/Breadcrumb';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '12,340', change: '+12%', positive: true, icon: Users, color: 'blue' },
  { label: 'Revenue', value: '$48,200', change: '+8.1%', positive: true, icon: DollarSign, color: 'green' },
  { label: 'Active Sessions', value: '1,234', change: '-3%', positive: false, icon: Activity, color: 'purple' },
  { label: 'Growth Rate', value: '24.5%', change: '+4.2%', positive: true, icon: TrendingUp, color: 'orange' },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Breadcrumb />
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here&apos;s what&apos;s happening with your app today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorMap[stat.color]}`}>
                  <Icon size={17} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className={`mt-1 text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                {stat.change} from last month
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          {[
            { action: 'New user registered', time: '2 min ago', dot: 'bg-blue-400' },
            { action: 'Report generated successfully', time: '14 min ago', dot: 'bg-green-400' },
            { action: 'Security alert resolved', time: '1 hr ago', dot: 'bg-yellow-400' },
            { action: 'Profile updated', time: '3 hr ago', dot: 'bg-purple-400' },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className={`w-2 h-2 rounded-full shrink-0 ${item.dot}`} />
              <span className="text-gray-700 flex-1">{item.action}</span>
              <span className="text-gray-400 text-xs">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
