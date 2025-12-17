'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push(`/${locale}`);
    router.refresh();
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      // Replace the locale in the pathname
      const segments = pathname.split('/');
      segments[1] = nextLocale;
      router.push(segments.join('/'));
    });
  };

  // Helper to remove locale from path for comparison or constructing links if using next-intl Link
  // For simplicity with standard Link + router, we manualy construct paths:
  const getLocalizedPath = (path: string) => `/${locale}${path}`;

  const isActive = (path: string) => pathname === getLocalizedPath(path) || (path === '/' && pathname === `/${locale}`) ? 'text-primary' : 'hover:text-primary';

  return (
    <nav className="bg-surface shadow-premium sticky top-0 z-50">
      <div className="container-custom py-4 flex justify-between items-center">
        <Link href={`/${locale}`} className="font-heading text-2xl font-bold text-primary">
          {t('home')}
        </Link>
        <div className="flex gap-8 items-center font-medium">
          <Link href={`/${locale}/rooms`} className={`relative transition-colors ${isActive('/rooms')}`}>
            {t('rooms')}
          </Link>
          <Link href={`/${locale}/about`} className={`relative transition-colors ${isActive('/about')}`}>
            {t('about')}
          </Link>
          <Link href={`/${locale}/contact`} className={`relative transition-colors ${isActive('/contact')}`}>
            {t('contact')}
          </Link>

          <select
            defaultValue={locale}
            onChange={onSelectChange}
            disabled={isPending}
            className="bg-transparent border border-border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold text-primary-dark">{t('hello')}, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                {t('logout')}
              </button>
            </div>
          ) : (
            <Link href={`/${locale}/login`} className="btn btn-primary">
              {t('login')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
