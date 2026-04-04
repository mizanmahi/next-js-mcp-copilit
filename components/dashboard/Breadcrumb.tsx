'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const labelMap: Record<string, string> = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  overview: 'Overview',
  reports: 'Reports',
  settings: 'Settings',
  profile: 'Profile',
  security: 'Security',
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label =
      labelMap[segment] ||
      segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-6 h-6 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Home"
          >
            <Home size={14} />
          </Link>
        </li>

        {crumbs.map(crumb => (
          <li key={crumb.href} className="flex items-center gap-1">
            <ChevronRight size={14} className="text-gray-300 shrink-0" />
            {crumb.isLast ? (
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium text-xs">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="px-2 py-0.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 text-xs transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
