import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="font-sans">
      <section className="h-[80vh] relative flex items-center justify-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}>
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 max-w-4xl p-5 text-center">
          <h1 className="text-6xl font-heading mb-4 text-white drop-shadow-lg">{t('heroTitle')}</h1>
          <p className="text-xl mb-8 drop-shadow-md">{t('heroSubtitle')}</p>
          <Link href="/rooms" className="btn btn-primary text-lg px-8 py-4">
            {t('viewRooms')}
          </Link>
        </div>
      </section>

      <section className="py-20 px-5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-secondary mb-4">{t('whyStayTitle')}</h2>
            <p className="text-text-muted">{t('whyStaySubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 border border-border rounded-lg text-center transition-transform hover:-translate-y-2 text-text-main shadow-sm hover:shadow-premium bg-white">
              <h3 className="text-xl font-bold mb-4 text-primary-dark">{t('feature1Title')}</h3>
              <p>{t('feature1Text')}</p>
            </div>
            <div className="p-8 border border-border rounded-lg text-center transition-transform hover:-translate-y-2 text-text-main shadow-sm hover:shadow-premium bg-white">
              <h3 className="text-xl font-bold mb-4 text-primary-dark">{t('feature2Title')}</h3>
              <p>{t('feature2Text')}</p>
            </div>
            <div className="p-8 border border-border rounded-lg text-center transition-transform hover:-translate-y-2 text-text-main shadow-sm hover:shadow-premium bg-white">
              <h3 className="text-xl font-bold mb-4 text-primary-dark">{t('feature3Title')}</h3>
              <p>{t('feature3Text')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-20 px-5 text-center">
        <div className="container-custom">
          <h2 className="text-4xl font-heading font-bold text-white mb-8">{t('ctaTitle')}</h2>
          <Link href="/rooms" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-4">
            {t('ctaButton')}
          </Link>
        </div>
      </section>

    </div>
  );
}
