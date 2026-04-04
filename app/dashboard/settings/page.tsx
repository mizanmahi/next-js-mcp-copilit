import Breadcrumb from '@/components/dashboard/Breadcrumb';
import { User, Shield } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Breadcrumb />
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account preferences and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Link
          href="/dashboard/settings/profile"
          className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <User size={20} />
          </div>
          <h3 className="font-semibold text-gray-800">Profile</h3>
          <p className="mt-1 text-sm text-gray-500">
            Update your personal information, photo, and display name.
          </p>
        </Link>

        <Link
          href="/dashboard/settings/security"
          className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <Shield size={20} />
          </div>
          <h3 className="font-semibold text-gray-800">Security</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage your password, two-factor authentication, and sessions.
          </p>
        </Link>
      </div>
    </div>
  );
}
