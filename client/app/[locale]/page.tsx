import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[90vh] relative flex items-center justify-center text-white overflow-hidden">
        {/* Background Overlay with Gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background/20 z-10" />

        <div className="relative z-20 max-w-5xl px-6 text-center">
          <span className="inline-block text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6 animate-fade-in">
            Welcome to Excellence
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading mb-8 text-white leading-tight drop-shadow-2xl">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/rooms" className="btn btn-primary text-lg px-10 py-4 w-full sm:w-auto">
              {t('viewRooms')}
            </Link>
            <Link href="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary text-lg px-10 py-4 w-full sm:w-auto">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block animate-bounce opacity-50">
          <div className="w-px h-12 bg-white mx-auto mb-2" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:py-32 bg-white relative">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-secondary mb-6">{t('whyStayTitle')}</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-8 rounded-full" />
            <p className="text-text-muted text-lg leading-relaxed">{t('whyStaySubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              { title: t('feature1Title'), text: t('feature1Text'), icon: "🌟" },
              { title: t('feature2Title'), text: t('feature2Text'), icon: "🍽️" },
              { title: t('feature3Title'), text: t('feature3Text'), icon: "🛡️" }
            ].map((feature, idx) => (
              <div key={idx} className="group p-10 rounded-3xl text-center bg-gray-50 border border-transparent hover:border-primary/20 hover:bg-white transition-all duration-500 hover:shadow-premium relative overflow-hidden">
                <div className="text-4xl mb-6 transform transition-transform group-hover:scale-125 duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-secondary group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-text-muted leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 md:py-32 overflow-hidden bg-secondary">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-10 leading-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-12 text-lg">
            Experience the pinnacle of luxury and comfort in our meticulously designed spaces.
          </p>
          <Link href="/rooms" className="btn bg-white text-secondary hover:bg-primary hover:text-white px-12 py-5 text-xl rounded-full">
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}
