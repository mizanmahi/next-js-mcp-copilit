'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  BarChart2,
  Settings,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  FileText,
  User,
  Shield,
} from 'lucide-react';

type SubItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

type MenuItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  subItems?: SubItem[];
};

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart2,
    subItems: [
      { label: 'Overview', href: '/dashboard/analytics/overview', icon: TrendingUp },
      { label: 'Reports', href: '/dashboard/analytics/reports', icon: FileText },
    ],
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    subItems: [
      { label: 'Profile', href: '/dashboard/settings/profile', icon: User },
      { label: 'Security', href: '/dashboard/settings/security', icon: Shield },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState<string[]>(() =>
    menuItems
      .filter(item => item.subItems && pathname.startsWith(item.href))
      .map(item => item.href)
  );

  const toggleMenu = (href: string) => {
    setOpenMenus(prev =>
      prev.includes(href) ? prev.filter(h => h !== href) : [...prev, href]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (href: string) =>
    pathname.startsWith(href) && pathname !== href;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex flex-col shadow-xl z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-700/60">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
          <LayoutDashboard size={16} className="text-white" />
        </div>
        <span className="text-base font-semibold tracking-tight text-white">MyDashboard</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Menu
        </p>
        <ul className="space-y-0.5">
          {menuItems.map(item => {
            const Icon = item.icon;
            const hasSubItems = !!item.subItems?.length;
            const isOpen = openMenus.includes(item.href);
            const active = isActive(item.href);
            const parentActive = isParentActive(item.href);

            return (
              <li key={item.href}>
                {hasSubItems ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.href)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer
                        ${parentActive || (active && hasSubItems)
                          ? 'bg-blue-600/20 text-blue-400'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={17} />
                        <span>{item.label}</span>
                      </div>
                      <span className="transition-transform duration-200" style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)' }}>
                        {isOpen
                          ? <ChevronDown size={15} className="text-gray-400" />
                          : <ChevronRight size={15} className="text-gray-500" />
                        }
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <ul className="mt-0.5 ml-3 space-y-0.5 border-l-2 border-gray-700/60 pl-3 py-1">
                        {item.subItems!.map(sub => {
                          const SubIcon = sub.icon;
                          return (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150
                                  ${isActive(sub.href)
                                    ? 'bg-blue-600 text-white font-medium shadow-sm'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                  }`}
                              >
                                <SubIcon size={15} />
                                <span>{sub.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                      ${active
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                  >
                    <Icon size={17} />
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-700/60">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shrink-0">
            <User size={13} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-300 truncate">Admin User</p>
            <p className="text-[10px] text-gray-500 truncate">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
