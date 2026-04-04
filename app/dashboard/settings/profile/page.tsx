import Breadcrumb from '@/components/dashboard/Breadcrumb';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Breadcrumb />
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your personal information and manage your public profile.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Avatar Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Profile Photo</h2>
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                <Camera size={13} className="text-gray-500" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, or GIF — max 2MB</p>
              <button className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Upload new photo
              </button>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-5">Personal Information</h2>
          <div className="space-y-4">
            {[
              { label: 'Full Name', icon: User, value: 'Admin User', type: 'text' },
              { label: 'Email Address', icon: Mail, value: 'admin@example.com', type: 'email' },
              { label: 'Phone Number', icon: Phone, value: '+1 (555) 000-0000', type: 'tel' },
              { label: 'Location', icon: MapPin, value: 'San Francisco, CA', type: 'text' },
            ].map(field => {
              const Icon = field.icon;
              return (
                <div key={field.label}>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Icon size={15} />
                    </div>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex gap-3">
            <button className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
              Save Changes
            </button>
            <button className="px-5 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
