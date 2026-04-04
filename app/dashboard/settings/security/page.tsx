import Breadcrumb from '@/components/dashboard/Breadcrumb';
import { Shield, Lock, Smartphone, Key, LogOut, CheckCircle, AlertTriangle } from 'lucide-react';

const sessions = [
  { device: 'Chrome on macOS', location: 'San Francisco, CA', lastActive: 'Now', current: true },
  { device: 'Safari on iPhone', location: 'New York, NY', lastActive: '2 hrs ago', current: false },
  { device: 'Firefox on Windows', location: 'Austin, TX', lastActive: '5 days ago', current: false },
];

export default function SecurityPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Breadcrumb />
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Security Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your password, two-factor authentication, and active sessions.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Password */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-5">
            <Lock size={16} className="text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-700">Change Password</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Current Password', id: 'current' },
              { label: 'New Password', id: 'new' },
              { label: 'Confirm New Password', id: 'confirm' },
            ].map(f => (
              <div key={f.id}>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  {f.label}
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••••"
                    className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-5 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            Update Password
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone size={16} className="text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-700">Two-Factor Authentication</h2>
            </div>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
              <AlertTriangle size={11} />
              Not enabled
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-500 leading-5">
            Add an extra layer of security to your account by requiring a verification code whenever you sign in from a new device.
          </p>
          <button className="mt-4 flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-600 text-sm font-medium rounded-xl hover:bg-blue-50 transition-colors">
            <Key size={14} />
            Enable 2FA
          </button>
        </div>

        {/* API Key */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-700">API Key</h2>
          </div>
          <div className="flex items-center gap-3">
            <input
              readOnly
              type="password"
              value="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="flex-1 px-4 py-2.5 text-sm font-mono text-gray-600 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
            />
            <button className="px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors">
              Reveal
            </button>
          </div>
          <button className="mt-3 text-xs font-medium text-red-500 hover:text-red-600 transition-colors">
            Regenerate API Key
          </button>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <LogOut size={16} className="text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-700">Active Sessions</h2>
          </div>
          <ul className="space-y-3">
            {sessions.map((session, i) => (
              <li
                key={i}
                className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-700">{session.device}</p>
                    {session.current && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        <CheckCircle size={9} /> Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{session.location} · {session.lastActive}</p>
                </div>
                {!session.current && (
                  <button className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors">
                    Revoke
                  </button>
                )}
              </li>
            ))}
          </ul>
          <button className="mt-4 text-xs font-medium text-red-500 hover:text-red-600 transition-colors">
            Revoke all other sessions
          </button>
        </div>
      </div>
    </div>
  );
}
