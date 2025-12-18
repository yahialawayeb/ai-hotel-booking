'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Globe, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      const segments = pathname.split('/');
      segments[1] = nextLocale;
      router.push(segments.join('/'));
    });
  };

  const getLocalizedPath = (path: string) => `/${locale}${path}`;
  const isActive = (path: string) => pathname === getLocalizedPath(path) || (path === '/' && pathname === `/${locale}`) ? 'text-primary' : 'text-secondary hover:text-primary';

  const NavLinks = () => (
    <>
      <Link href={getLocalizedPath('/rooms')} className={`transition-colors font-medium ${isActive('/rooms')}`} onClick={() => setIsMenuOpen(false)}>
        {t('rooms')}
      </Link>
      <Link href={getLocalizedPath('/about')} className={`transition-colors font-medium ${isActive('/about')}`} onClick={() => setIsMenuOpen(false)}>
        {t('about')}
      </Link>
      <Link href={getLocalizedPath('/contact')} className={`transition-colors font-medium ${isActive('/contact')}`} onClick={() => setIsMenuOpen(false)}>
        {t('contact')}
      </Link>
    </>
  );

  return (
    <nav className="glass-morphism sticky top-0 z-50 py-4 shadow-sm">
      <div className="container-custom flex justify-between items-center">
        <Link href={`/${locale}`} className="font-heading text-2xl font-bold text-primary tracking-tight">
          LuxeHotel
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLinks />

          <div className="h-6 w-px bg-border mx-2" />

          <div className="flex items-center gap-2 text-secondary-light">
            <Globe className="w-4 h-4 text-primary" />
            <select
              defaultValue={locale}
              onChange={onSelectChange}
              disabled={isPending}
              className="bg-transparent border-none appearance-none cursor-pointer text-sm font-medium focus:outline-none"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>
          </div>

          {user ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <UserIcon className="w-4 h-4 text-primary" />
                </div>
                <span className="font-semibold text-secondary">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="text-secondary hover:text-primary transition-colors flex items-center gap-2">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href={`/${locale}/login`} className="btn btn-primary btn-sm rounded-full px-6">
              {t('login')}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-secondary hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-6">
            <NavLinks />
            <div className="border-t border-border pt-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t('language') || 'Language'}</span>
                </div>
                <select
                  defaultValue={locale}
                  onChange={onSelectChange}
                  className="bg-gray-50 border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <UserIcon className="w-5 h-5 text-primary" />
                    <span className="font-bold">{user.name}</span>
                  </div>
                  <button onClick={handleLogout} className="btn btn-secondary w-full flex items-center justify-center gap-2">
                    <LogOut className="w-4 h-4" /> {t('logout')}
                  </button>
                </div>
              ) : (
                <Link href={`/${locale}/login`} className="btn btn-primary w-full" onClick={() => setIsMenuOpen(false)}>
                  {t('login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
